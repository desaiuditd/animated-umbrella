package edu.scu.java.webcrawl.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class MustacheCharts {
public class DomainPages{
	public String DomainName;
	public int numberOfPages;
	public DomainPages(String domainName, int numberOfPages) {
		super();
		DomainName = domainName;
		this.numberOfPages = numberOfPages;
	}
	
}

public class HttpCodes{
	public int HttpCode;
	public int count;
	public HttpCodes(int httpCode, int count) {
		super();
		HttpCode = httpCode;
		this.count = count;
	}
	
}
public class WordCount{
	public int frequency;
	public String word;
	public WordCount(int frequency, String word) {
		super();
		this.frequency = frequency;
		this.word = word;
	}
	
}
public List<DomainPages> domainPages;
public List<HttpCodes> httpCodes;
public List<WordCount> wordCounts;

}
