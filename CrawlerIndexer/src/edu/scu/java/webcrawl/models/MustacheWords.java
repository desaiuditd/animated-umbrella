package edu.scu.java.webcrawl.models;

import java.util.ArrayList;
import java.util.List;


public class MustacheWords {
	public List<Word> words;
	
	public class Word{
		public String Value;
		public int Count;
		public Word(String value, int count) {
			super();
			Value = value;
			Count = count;
		}
		
	}


}
