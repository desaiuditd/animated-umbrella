require 'sinatra'
require 'json'
require 'phrasie'
extractor = Phrasie::Extractor.new
set :port, 5050

post '/extract/?' do
  terms=extractor.phrases(params[:text].to_s).keep_if {|v| v[0].length>=3}
  tags= Array.new
  terms[0..5].each do |row| #
    tags.push(row[0]);
  end
  tags.to_json
 # params[:text].to_json
end

get '/' do
	<<-EOS
This server provides api for creating tags for the supplied text.<br /><br />

Runs in ruby.<br /><br />

Steps to run the server.<br /><br />

1. Install ruby<br />
2. Install ruby devkit<br />
3. Install Gems sinatra, json, phrasie<br />
4. Run the file sinatra.rb using "ruby sinatra.rb"<br /><br />

Note : this server can only understand form data.<br />
Example POST request :<br />
POST /extract HTTP/1.1<br />
Host: localhost:5050<br />
Cache-Control: no-cache<br />
Postman-Token: e6ec2b2c-38e3-102c-34e6-0ff4b51bce8d<br />
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW<br /><br />

----WebKitFormBoundary7MA4YWxkTrZu0gW<br />
Content-Disposition: form-data; name="text"<br /><br />

When Twitter  first announced Audio Cards that would put songs in your social feed, SoundCloud was the music service of choice at launch. After the feature has been \n available for well over a year, Spotify tracks will now show up in a similar fashion. Any tweet that contains a link to a song from the streaming service will offer a 30-second preview in your timeline. Spotify clips will also appear in that curated Moments feed, which is how the company broke the news today.  Now that Spotify has amassed 30 million paying users and over 75 million folks are listening for free, it makes sense for the Twitter feature to tap into that audience. As you might expect, these cards will show up in the social network's website in addition to its Android and iOS apps. Although most tracks should display as cards now, Twitter says the full rollout should be complete in about a week.<br />
----WebKitFormBoundary7MA4YWxkTrZu0gW<br />
	EOS
end