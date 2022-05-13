class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  # method "URL" do
    
  # end
  get "/dogs" do 
    { hello: "world"}.to_json
  end

end
