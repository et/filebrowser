# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'coffeescript', :input => 'public/coffeescripts', :output => 'public/javascripts'

guard 'evergreen' do
  watch(%r{(spec)|(public)/coffeescripts/.*.coffee})
end
