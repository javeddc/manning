require 'sinatra'
# require 'sinatra/reloader'

require 'pry'
require 'pg'
require 'active_record'

require_relative 'db_config'


require_relative 'models/chat'
require_relative 'models/category'
require_relative 'models/user'

enable :sessions


helpers do
  def logged_in?
    if current_user
      true
    else
      false
    end

  end

  def current_user
    User.find_by(id: session[:user_id])
  end
end

$file = File.readlines('chatbot.csv')
$file.map! do |str|
  str.chomp
end
$file.map! do |str|
  str.split '|'
end
$file.each do |arr|
  arr.map! do |str|
    str.chomp
  end
end

def get_response(input)
  $file.each do |arr|
    if arr[0].include? input
      found = true
      return arr[1]
    else
      return 'Sorry'
    end
  end
end

get '/' do
  redirect '/login' unless session[:user_id]

  erb :index
end


get '/response' do
  query = params[:input]
  if query != ''
    response = get_response(query)
    return response
  end
end

get '/login' do
  erb :login
end

get '/home' do

  @user = User.find(session[:user_id]).email
  @chats = Chat.where(user_id: session[:user_id])
  erb :home



end

post '/session' do
  user = User.find_by(email: params[:email])
  if user && user.authenticate(params[:password]) then
    session[:user_id] = user.id
    redirect '/'
  else
    erb :login
  end
end

get '/chat' do
  # return Chat.find(session[:user_id]).email
  return Chat.where(user_id: session[:user_id]).as_json.to_json
end

post '/chat' do
  redirect '/login' unless session[:user_id]

  c1 = Chat.new(body: params[:body], user_id: User.find(session[:user_id]).id, origin: 'user', time_stamp: Time.now )
  c1.save
  # c2 = Chat.new(body: get_response(params[:body]), user_id: User.find(session[:user_id]).id, origin: 'app', time_stamp: Time.now )
  # c2.save
  redirect "/home"
end


delete '/session' do
  session[:user_id] = nil
  # always redirect from post routes!!!!
  redirect '/dishes'
end
