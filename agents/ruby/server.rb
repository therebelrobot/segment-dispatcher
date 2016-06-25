require 'sinatra'

set :bind, '0.0.0.0'
set :port, 8005

post '/' do
  data = request.body.read
  "Hello #{data} #{request.form_data?}!"
end
