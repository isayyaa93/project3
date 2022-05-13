class FeedsController < ApplicationController

  get "/feeds" do 
    serialize(Feed.all)
  end
 
  post "/feeds" do 
    serialize(Feed.create(feed_params))
  end

  delete "/feeds/:id" do 
    serialize(Feed.find(params[:id]).destroy)
  end

  private 

  # a method used to specify which keys are allowed through params into the controller
  # we use this method to create a list of what's permitted to be passed to .create or .update
  # within controller actions.
  def feed_params
    allowed_params = %w(time dog_ids)
    params.select {|param,value| allowed_params.include?(param)}
  end

  def serialize(objects)
    objects.to_json(
      methods: :formatted_time
    )
  end
end