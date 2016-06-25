https://segment.com/docs/libraries/

# dispatcher client + api (built in docker)
- Analytics.js
- Pixel
- HTTP

# agent-runners (in order of work, built in docker)
- Node 
  - express 
  - raw json
  - cd nodejs
  - docker build --tag nodejs-agent-segment-dispatcher .
  - docker run nodejs-agent-segment-dispatcher
- Go 
  - echo 
  - https://github.com/labstack/echo 
  - form with json
  - cd golang
  - docker build --tag golang-agent-segment-dispatcher .
  - docker run golang-agent-segment-dispatcher
- Python 
  - flask 
  - http://flask.pocoo.org/docs/0.11/quickstart/#routing 
  - form with json
  - cd python
  - docker build --tag python-agent-segment-dispatcher .
  - docker run python-agent-segment-dispatcher
- Ruby 
  - rvm use 2.3 
  - sinatra 
  - https://github.com/sinatra/sinatra 
  - raw json
  - cd ruby
  - docker build --tag ruby-agent-segment-dispatcher .
  - docker run ruby-agent-segment-dispatcher
- PHP 
  - php -S 0.0.0.0:4567 index.php 
  - BulletPHP 
  - http://bulletphp.com/docs/request/
  - form with json
  - cd php
  - docker build --tag php-agent-segment-dispatcher .
  - docker run php-agent-segment-dispatcher

# unsupported (devices I don't have)
- Java - spark
- Clojure - 
- .NET (windows)
- Android (development android)
- Android Wear (Smartwatch)
- iOS (iphone)
- Xamarin (license)


---
Hey Trent,

Thanks for taking the time to chat earlier. Loved hearing about your side projects. I’m super excited to see that documentation one you’re working on!

I’ve detailed the simulator question below. Can you try to submit it to me no later than 48 hours from when you start? (I don’t think it will take that long, but just wanted to have a deadline that’s consistent with other people we’ve sent it to for fairness!)

Please let me know if you have any questions for me before you start or even during the project. I’m more than happy to help point you in the right direction, so don’t be shy to ask questions if you’re confused about anything :)

Cheers,

Steven Miller
Engineering Manager @ Segment

Analytics Simulator

As a dev team, we'd like a way to to simulate events from our different analytics libraries (ruby, node, etc.) being sent to Segment for testing purposes (to see how our system handles different kinds of events).

We’d like you to build a simulator to generate fake events and send them through our system. There are two main inputs — which library we're simulating and which kind of call we're simulating.  You can read more about the different kinds of calls if you click around on the link above!




Before you start actually writing code, be sure to think about your general approach to the problem.
  • What’s going to need to happen on the client-side?
  • What’s going to need to happen on the server-side?
  • How is data going to be passed between the client and the server?
  • What order makes sense to build these?

We’re going to evaluate you on the following dimensions:
  • getting something that works end-to-end that sends data to an actual Segment source using our real server-side library
  • because this will take arbitrary text, we’d like to see you validate your inputs and handle error cases (use your judgment on how to handle!)
  • we’d like to see a simple/clear API design between the frontend and the backend
  • bonus points for figuring out how to send to multiple different kinds of server-side libraries

Deliverables

We'd like to see the following things:
  • the code you write
  • a link where we can play with the debugger
  • a README file explaining what the code does and how long you spent on each part of the project
