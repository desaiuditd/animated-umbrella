package edu.scu.java.webcrawl.controller;

import java.net.MalformedURLException;
import java.net.UnknownHostException;

import edu.scu.java.webcrawl.statics.Log;

public class Main {

	public static void main(String[] args) throws MalformedURLException, UnknownHostException {
		if(args.length<1)
			{
			Log.writeLog("Supply csv file name");
			return;
			}
		WebCrawler controller= WebCrawler.createCrawler(args[0]);//new WebCrawler("http://www.usc.edu", 200, false);
		controller.start();
	}

}
