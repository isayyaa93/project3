class DogFeedsController < ApplicationController
  post "/dog_feeds" do 
    dog_feed = DogFeed.create(dog_feed_params)
    dog_feed.to_json(methods: [:formatted_time])
  end

  patch "/dog_feeds/:id" do
    dog_feed = DogFeed.find(params[:id])
    dog_feed.update(dog_feed_params)
    dog_feed.to_json(methods: [:formatted_time])
  end

  delete "/dog_feeds/:id" do
    dog_feed = DogFeed.find(params[:id])
    dog_feed.destroy
    dog_feed.to_json(methods: [:formatted_time])
  end

  private 

  # a method used to specify which keys are allowed through params into the controller
  # we use this method to create a list of what's permitted to be passed to .create or .update
  # within controller actions.
  def dog_feed_params
    allowed_params = %w(dog_id feed_time pooped)
    params.select {|param,value| allowed_params.include?(param)}
  end
end