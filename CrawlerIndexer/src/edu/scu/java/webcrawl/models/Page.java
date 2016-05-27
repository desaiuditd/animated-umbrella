package edu.scu.java.webcrawl.models;

import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import edu.scu.java.webcrawl.CrawlerException;
import edu.scu.java.webcrawl.controller.Constants;
import org.jsoup.select.Elements;

public class Page {
	private URL Url;
	private Document html;

	public URL getUrl() {
		return Url;
	}

	private String Title;
	private Document htmlDocument;
	private int HttpStatusCode;
	private List<String> LinksFromThePage;
	private URI HTMLUri,TextUri;

	public String _index, _type, _id;
	public String plainText;
	public String meta;

	public String getMeta() {
		return meta;
	}

	public void setMeta(String meta) {
		this.meta = meta;
	}

	public Page(URL pageUri){
		this.Url=pageUri;
		this.LinksFromThePage= new ArrayList<String>();
	}
	
	public Page executeAndReturn() throws CrawlerException {
        try {
        	Connection connection = Jsoup.connect(this.Url.toString()).userAgent(Constants.USER_AGENT);
			this.htmlDocument = connection.get();
			this.HttpStatusCode= connection.response().statusCode();
			if(HttpStatusCode==200){
				 for(Element Href:htmlDocument.select("a[href]")){
					 LinksFromThePage.add(Href.absUrl("href"));
				 }
				 this.Title= htmlDocument.title();
				 this.Title = (Title == null || Title.length()<=2)? this.Url.toString(): Title;
				this.meta= getMetaTag(htmlDocument);
			}
			else{
				throw new CrawlerException("Exception with the Jsoup  ", CrawlerException.State.Network);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			try {
				throw new CrawlerException("Exception with the Jsoup connection : "+e.getMessage(), CrawlerException.State.Network);
			} catch (CrawlerException e1) {
				return null;
			}
		}
		
		return this;
	}

	private String getMetaTag(Document document) {
		Elements elements = document.select("meta[name=" + "description" + "]");
		for (Element element : elements) {
			final String s = element.attr("content");
			if (s != null) return s;
		}
		elements = document.select("meta[property=" + "description" + "]");
		for (Element element : elements) {
			final String s = element.attr("content");
			if (s != null) return s;
		}
		elements = document.select("meta[name=" + "og:description" + "]");
		for (Element element : elements) {
			final String s = element.attr("content");
			if (s != null) return s;
		}
		elements = document.select("meta[property=" + "og:description" + "]");
		for (Element element : elements) {
			final String s = element.attr("content");
			if (s != null) return s;
		}
		return null;
	}

	private Document getErrorHTML() {
		String html = "<html><head><title>"+this.Url+"</title></head>"
				  + "<body><p>You are seeing this because this HTML file got this HTTP CODE: "+this.HttpStatusCode+"</p></body></html>";
		return Jsoup.parse(html);
	}

	public URL getUri() {
		return Url;
	}


	public String getTitle() {
		return Title;
	}

	public int getHttpStatusCode() {
		return HttpStatusCode;
	}

	public List<String> getLinksFromThePage() {
		return LinksFromThePage;
	}
	
	public Document getHTML(){
		return this.htmlDocument;
	}
	
	public String getSanitizedTitle(){
		String fileName= this.Url.getPath().toString().toLowerCase().replaceAll("/","_");
		fileName=fileName+"Crawled.html";
		return fileName;
	}

	public String getTextUri() {
		int hostIndex=TextUri.toString().indexOf(this.getUri().getHost());
		String relativeUri="./"+TextUri.toString().substring(hostIndex, TextUri.toString().length());
		return relativeUri;
	}

	public void setTextUri(URI textUri) {
		TextUri = textUri;
	}

	public String getHTMLUri() {
		int hostIndex=HTMLUri.toString().indexOf(this.getUri().getHost());
		String relativeUri="./"+HTMLUri.toString().substring(hostIndex, HTMLUri.toString().length());
		return relativeUri;
	}

	public void setHTMLUri(URI hTMLUri) {
		HTMLUri = hTMLUri;
	}
	
	public int noOfLinks(){
		return this.LinksFromThePage.size();
	}


	public Object getTags(String text) {
		try {
			HttpResponse response=Unirest.post("http://localhost:5050/extract")
                    .field("text", text+this.meta)
                    .asString();
			JSONArray array= new JSONArray(response.getBody().toString());

			return array;
		} catch (UnirestException e) {
			return null;
		}
	}

	public void setHtml(Document html) {
		this.html = html;
	}
}
