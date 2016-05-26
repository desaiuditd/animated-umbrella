require 'sinatra'
require 'JSON'
require 'phrasie'
extractor = Phrasie::Extractor.new
set :port, 5050

post '/extract/?' do
  terms=extractor.phrases(params[:text].to_s)
  tags= Array.new
  terms.each do |row|
    tags.push(row[0]);
  end
  tags.to_json
 # params[:text].to_json
end

