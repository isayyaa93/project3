class Dog < ActiveRecord::Base
  has_many :dog_feeds, dependent: :destroy
  has_many :feeds, through: :dog_feeds
  has_many :dog_feeds_with_poop, -> {with_poop}, class_name: 'DogFeed'
  has_many :feeds_with_poop, -> {order(time: :desc)}, through: :dog_feeds_with_poop, source: :feed

  scope :by_breed, -> (breed) { where("breed LIKE ?", "%#{breed}%") }
  scope :puppies, -> { where("birthdate > ?", 1.year.ago)}
  scope :mix, -> { where("breed LIKE ?", "%mix%").or(where("breed LIKE ?", "%/%")) }

  def self.needs_to_poop
    recently_pooped_dog_ids = DogFeed.includes(:feed).where(dog_feeds: {pooped: true}, feeds: { time: 6.hours.ago..DateTime.now } ).pluck(:dog_id)
    self.where.not(id: recently_pooped_dog_ids)
  end

  def last_pooped_at
    self.feeds_with_poop.first.try(:time)
  end

  def age
    return nil if self.birthdate.nil?
    days_old = (Date.today - self.birthdate).to_i.days
    if days_old < 30.days
      weeks_old = days_old.in_weeks.floor
      "#{weeks_old} #{'week'.pluralize(weeks_old)}"
    elsif days_old < 365.days
      months_old = days_old.in_months.floor
      "#{months_old} #{'month'.pluralize(months_old)}"
    else
      years_old = days_old.in_years.floor
      "#{years_old} #{'year'.pluralize(years_old)}"
    end
  end
end