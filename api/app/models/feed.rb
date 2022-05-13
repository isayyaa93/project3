class Feed < ActiveRecord::Base
  has_many :dog_feeds, dependent: :destroy
  has_many :dogs, through: :dog_feeds

  scope :recent, -> { where("time > ?", 6.hours.ago)}

  def formatted_time
    time.strftime("%A, %m/%d/%y %l:%M %p")
  end
end