class DogFeed < ActiveRecord::Base
  belongs_to :dog
  belongs_to :feed

  scope :with_poop, -> { where(pooped: true) }
  # equivalent to
  # def self.with_poop
  #   where(pooped: true)
  # end

  delegate :formatted_time, to: :feed
  # equivalent to
  # def formatted_time
  #   feed.formatted_time
  # end

 
end