package edu.scu.java.webcrawl.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.lang.management.ManagementFactory;
import java.lang.management.ThreadInfo;
import java.lang.management.ThreadMXBean;
import java.net.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import org.apache.commons.validator.UrlValidator;

import com.opencsv.CSVReader;

import edu.scu.java.webcrawl.ContentExtractor;
import edu.scu.java.webcrawl.Crawler;
import edu.scu.java.webcrawl.interfaces.CrawlerControllerCommunicator;

import edu.scu.java.webcrawl.models.Page;
import edu.scu.java.webcrawl.statics.Log;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.common.xcontent.XContentBuilder;

import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;

public class WebCrawler implements CrawlerControllerCommunicator {
	private int LimitNumberOfPages;
	private boolean isDomainRestricted;
	private Integer VisitedCount=0;
	private Crawler[] CrawlerPool;
	public int getVisitedCount() {
		return VisitedCount;
	}
	public synchronized void incVisitedCount() {
		 VisitedCount++;
	}
	private URL SeedUrl;
	private List<Page> visitedPages;
	private HashSet<String> MapPagesVisited;
	private HashMap<String,Crawler> DomainCrawlerMap;
	private final String[] schemes = {"http","https"}; //supporting only http and https
	private ThreadGroup CrawlersGroup;
	private final UrlValidator urlValidator = new UrlValidator(schemes);
	public Crawler RootCrawler;
    ContentExtractor extractor;
	private HashMap<Integer,Integer> HttpCodesMap;
	private HashMap<String,List<Page>> DomainPagesMap;
    Client ESclient;
 	public int getNumberOfPages() {
		return LimitNumberOfPages;
	}

	public void setNumberOfPages(int numberOfPages) {
		LimitNumberOfPages = numberOfPages;
	}

	public boolean isDomainRestricted() {
		return isDomainRestricted;
	}

	public void setDomainRestricted(boolean isDomainRestricted) {
		this.isDomainRestricted = isDomainRestricted;
	}

	public URL getSeedUrl() {
		return SeedUrl;
	}

	public void setSeedUrl(URL uri) {
		SeedUrl = uri;
	}

	public WebCrawler(String url,int numberofPages, boolean domainrestricted) throws MalformedURLException, UnknownHostException {
		this.SeedUrl=new URL(url);
		this.LimitNumberOfPages=numberofPages;
		this.isDomainRestricted=domainrestricted;
		this.visitedPages= new ArrayList<Page>();
		this.MapPagesVisited= new HashSet<String>();
		this.DomainCrawlerMap= new HashMap<String,Crawler>();
		this.CrawlersGroup= new ThreadGroup("crawlers");
		this.CrawlerPool= new Crawler[Constants.MAX_CRAWLERS];
		//Multiset for storing word occurrences
        extractor= new ContentExtractor();
		HttpCodesMap= new HashMap<>();
		DomainPagesMap= new HashMap<>();
     //   Settings settings = Settings.builder().put("cluster.name", "locales").build();

        ESclient = TransportClient.builder().build()
                .addTransportAddress(new InetSocketTransportAddress(new InetSocketAddress("52.40.86.78",9300)));  //52.40.86.78
        //Add transport addresses and do something with the client...
	}
	
	public List<Page> getPagesListForDomain(String domain){
		if(DomainPagesMap.get(domain)==null){
			DomainPagesMap.put(domain, new ArrayList<Page>());
		}
		return DomainPagesMap.get(domain);
	}
	
	public static WebCrawler webCrawlerFactory(String FileName){
		 try {
			CSVReader reader = new CSVReader(new FileReader(FileName));
			String[] input= reader.readNext();
			if((input.length==3)){
				return new WebCrawler(input[0], Integer.parseInt(input[1]), Boolean.parseBoolean(input[2]));
			}
			else if((input.length==2)){
				return new WebCrawler(input[0], Integer.parseInt(input[1]),false); // by default, we should allow cross domain crawling
			}
			else{
				Log.writeLog("Something wrong with the input File");
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 return null;
	}

	public static WebCrawler createCrawler(String seed) throws MalformedURLException, UnknownHostException {
		return new WebCrawler(seed, Integer.parseInt("2"),true);
	}
	@Override
	public synchronized boolean isOkToProceed(String url,Crawler c) throws InterruptedException {
		// To stop crawler threads to exceed the limit
		synchronized (VisitedCount) {
			if(VisitedCount>=LimitNumberOfPages)
				{
				return false;
				}
			else{
				return true;
			}
			
		}

	}

	public void updateLinks(List<String> newUrls) {
		synchronized (MapPagesVisited) {
			for(String uri:newUrls){
				try {
					uri=uri.replaceAll(" ","");
					if(!isvalidUrl(uri))
						continue;
					else if(isDomainRestricted && !(new URL(uri).getHost().equals(SeedUrl.getHost()))){
						continue;
					}
					URL newLink=new URL(uri);
					String link=newLink.getHost()+((newLink.getPath()==null || newLink.getPath().equals("/"))?"":newLink.getPath())+((newLink.getQuery()==null)?"":newLink.getQuery());
					if(link.endsWith("/"))
						link = link.substring(0, link.length()-1);
					if(MapPagesVisited.add(link)){
							putNextUriForCrawlers(new URL(newLink.getProtocol()+"://"+link));
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}	
		}
			
	}
	
	private void putNextUriForCrawlers(URL newLink) {
	
		Crawler crawler= getCrawlerForDomain(newLink.getHost());
		crawler.putNextUri(newLink);
	}
	private boolean isvalidUrl(String uri) {
		
		if (urlValidator.isValid(uri)) {
		   return true;
		} 
		return false;
	}

	public void start(){
		RootCrawler= getCrawlerForDomain(SeedUrl.getHost());
			RootCrawler.putNextUri(SeedUrl);
		Thread StatusListener= new Thread(new Runnable() {
			
			@Override
			public void run() {
				ThreadMXBean bean = ManagementFactory.getThreadMXBean();
				
					while(getVisitedCount()<LimitNumberOfPages){
						try {
							Thread.sleep(200);
							//System.out.print("\rDomains : "+DomainCrawlerMap.size()+"\tPages Crawled : "+visitedPages.size()+"\t Crawlers : "+Constants.getLength(CrawlerPool)+"");
							long[] threadIds = bean.findDeadlockedThreads(); // Returns null if no threads are deadlocked.
							if (threadIds != null) {
								Log.writeLog("Problem detected with threads.. Please restart the process ");
								break;
							}
							
						} catch (InterruptedException e) {
							Log.writeLog(" Main Status Listener Interrupted "+e.getMessage());
						}
						
					}
					stopAllCrawlersAbruptly();
					
				}
				
			
		});
		StatusListener.start();
		
	}

	@Override
	public void addNewVisitedPage(Page page) throws InterruptedException {

          //  System.out.println(page.getUri());
			if(VisitedCount>=LimitNumberOfPages){
				return;
			}
			else{
				//VisitedCount;
				//this.visitedPages.add(page);
                indexThisPage(page);
				synchronized (MapPagesVisited) {
					MapPagesVisited.add(page.getUri().getHost()+((page.getUri().getPath()==null || page.getUri().getPath().equals("/"))?"":page.getUri().getPath())+((page.getUri().getQuery()==null)?"":page.getUri().getQuery()));
				}
				this.updateLinks(page.getLinksFromThePage());
			}
			

		
	}
	private void processContent() {
		Log.writeLog("Processing Content Starts.....");
		Log.writeLog("Total Number of Pages Crawled and stored :"+ VisitedCount );
		Log.writeLog("Total Number of Crawlers that have been created so far : " + Constants.getLength(CrawlerPool));
		
		//We will create a separate folder for each host/domain and have it's files inside it.
		Date now = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd_MM_hh_mm_ss");
		String ParentFolder = System.getProperty("user.dir")+"/WebCrawler"+dateFormat.format(now);
		ContentExtractor extractor= new ContentExtractor();
		
		/*for(Page p: visitedPages){
            if(p.getHTML()!=null){
        try {
               String text= extractor.extractFromDocument(p.getHTML());//CommonExtractors.DEFAULT_EXTRACTOR.getText(p.getHTML().html().toString());
                System.out.println(p.getUri());

           } catch (Exception e) { //BoilerpipeProcessing
               // TODO Auto-generated catch block
               e.printStackTrace();
           }

            }
        }*/
		
	}

	private void stopAllCrawlersAbruptly() {
		Log.writeLog(" Stopping signal has been issued !!! ");
	
		CrawlersGroup.interrupt();

	Log.writeLog(" All the Sub-Crawlers stopped ");
	processContent();
	}

	private Crawler getCrawlerForDomain(String domain){
		if(DomainCrawlerMap==null)
			return null;
		else if(!DomainCrawlerMap.containsKey(domain)){
			Crawler newCrawler = createNewCrawler();// new Crawler(this, domain);
			DomainCrawlerMap.put(domain, newCrawler);
			return newCrawler;
		}
		return DomainCrawlerMap.get(domain);
	}

	
	private synchronized Crawler createNewCrawler() {
	    int randomNum = ThreadLocalRandom.current().nextInt(0,Constants.MAX_CRAWLERS);
	    if(CrawlerPool[randomNum]==null){
	    	CrawlerPool[randomNum]= new Crawler(this,randomNum );
	    }
		return CrawlerPool[randomNum];
	}
	@Override
	public ThreadGroup getCrawlersGroup(){
		return this.CrawlersGroup;
	}

    public void indexThisPage(Page p){
        if(p.getHTML()!=null){
            try {
                p.plainText= extractor.extractFromDocument(p);//CommonExtractors.DEFAULT_EXTRACTOR.getText(p.getHTML().html().toString());

				XContentBuilder json = jsonBuilder()
						.startObject()
						.field("url", p.getUrl().toString())
						.field("text", p.plainText)
						.field("timestamp", new Date())
						.field("title", p.getTitle())
						.field("source", p.getUrl().getHost().toString())
						.field("tags", p.getTags(p.plainText))
						.field("html", p.getHTML().toString())
						.field("meta",p.getMeta())
						.endObject();
              IndexResponse response = ESclient.prepareIndex("techblogs", "page")
                        .setSource(json)
                        .get();
              p._id=response.getId();
                p._index=response.getIndex();
                p._type=response.getType();

               System.out.println(p.getUri() + " " +p._id +" "+ p._index +" "+p._type);
			///	System.out.println(json.string());

            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }
	
	
}
