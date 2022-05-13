Phase 3 project.

Used Mr.Dakota and our cohort's dummy project(dog and walks) to create a new project.

I chose 'Dog and feedings' relationship that has many relationships.

localhost:3000 is the default server.

Make sure to:

1. bundle install at "api" directory. Then start the server with 'bunndle exec rake server' if there is an error, follow 3.
2. With new terminal tab, npm install and npm start at dog_feeder directory.
3. ##this is important##

THE SERVER WONT't START after launching App since a few hours - days ago --> that means there's already a server running somewhere. You wll get an error in the terminal saying there is NO port.

-->> in terminal DO NOT hit ctrl+ C to exit out the error message then type. Please type this in a new terminal tab. Not with a same terminal that had error message.

"ps-ax | grep rackup"

You'll see a list of all processes that include servers with 5 digits number. Then do this:

example) type: "kill -9 12345" (12345 is an example digits server number)

Notice that most styling and react structure for the front end is designed by Flatiron School. I put personal taste like fonts and coloring.

Requirements for this project:

-Use Active Record to interact with a database.
-Have at least two models with a one-to-many relationship.
-At a minimum, set up the following API routes in Sinatra:
-create and read actions for both models
-full CRUD capability for one of the models
-Build a separate React frontend application that interacts with the API -to perform CRUD actions.
-Use good OO design patterns. You should have separate classes for each of your models, and create instance and class methods as necessary.
