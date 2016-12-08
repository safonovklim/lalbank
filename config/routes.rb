Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    scope '/v1' do
      scope '/users/' do
        post '/sign_up' => 'client#signup'
      end
    end
  end
end
