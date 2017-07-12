require 'pry'
require 'active_record'
require_relative 'db_config'

# options = {
#   adapter: 'postgresql',
#   database: 'goodfoodhunting'
# }


require_relative 'models/user'
require_relative 'models/chat'

# enable :sessions

binding.pry
