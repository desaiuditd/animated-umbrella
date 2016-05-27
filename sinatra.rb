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

