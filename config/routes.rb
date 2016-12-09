Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    scope module: 'api' do
      namespace :v1 do
        scope '/users' do
          post '/sign_up' => 'clients#signup'
          get '/:id' => 'clients#show'
          get '/' => 'clients#index'
          put '/' => 'clients#update'
        end
        scope '/employee' do
          post '/sign_up' => 'employee#create'
          post '/log_in' => 'employee_token#create'
        end
      end
    end
  end
end