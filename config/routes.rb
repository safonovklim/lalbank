Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    scope module: 'api' do
      namespace :v1 do
        scope '/users' do
          post '/sign_up' => 'client#create'

          get '/:user_id/cards' => 'card#index'
          post '/:user_id/cards' => 'card#create'

          get '/:user_id/tranactions' => 'card#index'

          get '/:id' => 'client#show'
          get '/' => 'client#index'
          put '/' => 'client#update'
          post '/:id/approve' => 'client#approve'
          post '/:id/ban' => 'client#ban'
          post '/:id/unban' => 'client#unban'
        end
        scope '/employee' do
          post '/sign_up' => 'employee#create'
          post '/log_in' => 'employee_token#create'
        end
      end
    end
  end
  scope '/gateway' do
    scope module: 'gateway' do
      namespace :v1 do
        post '/sexycard' => 'transaction#thru_sexycard' # SexyCard is like Visa, Mastercard, Maestro
      end
    end
  end
end