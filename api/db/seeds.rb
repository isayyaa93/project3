dogs_attributes = [
  {
    name: "Zaza",	
    birthdate: Date.new(2020, 11, 17),
    breed:	"Samoyed/Landcloud",
    image_url: "https://i.postimg.cc/sXL552q6/Screenshot-2022-05-11-at-1-31-48-PM.png"
  },
  {
    name: "Didi",	
    birthdate: Date.new(2019,06, 21),
    breed:	"Pug",
    image_url: "https://www.gannett-cdn.com/presto/2020/01/30/PREN/42e2fa6a-b776-4a9f-8c54-45afeac35924-pug_one.jpg"  
  },
  {
    name: "Dingo",	
    birthdate: Date.new(2017, 9, 27),
    breed:	"Shar Pei",
    image_url: "https://pbs.twimg.com/media/EUxA3TuXYAA93vr.jpg"
  },
  {
    name: "Coco",	
    birthdate: Date.new(2020, 7, 31),
    breed:	"Cocker Spaniel",
    image_url: "https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2021/10/wilf3IMG_2268.jpg"
  },
  {
    name: "Gidget",	
    birthdate: Date.new(2019, 12, 31),
    breed:	"Pomeranian",
    image_url: "https://i.pinimg.com/originals/98/d7/f4/98d7f46534859a24a1271a163efa14c5.jpg"
  },
  {
    name: "Shiba Inu",	
    birthdate: Date.new(2019, 12, 31),
    breed:	"Shiba Inu",
    image_url: "https://www.nj.com/resizer/8H1EEl92C8a43ao-WxAMqqXNqhM=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/5JRM66VLCNFJ7ANPWR3VHYCCBQ.png"
  },
]

dogs = dogs_attributes.map{|attrs| Dog.create(attrs)}

feeds_attributes = [
  {time: 1.day.ago},
  {time: 3.hours.ago},
  {time: 5.hours.ago}
]

feeds = feeds_attributes.map do |attrs| 
  Feed.create(attrs)
end


puts "#{Dog.count} dogs created"
puts "#{DogFeed.count} dog_feeds created"
puts "#{Feed.count} feeds created"