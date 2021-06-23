Rails.application.routes.draw do
  resources :games
  #resources :decks, only: [:index, :update]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # resources :rooms, only: [:index, :show]
  # resources :messages, only: [:index, :create]
  # resources :users, only: [:index, :create]
  #resources :messages, only: [:index, :create]
  mount ActionCable.server => '/cable'

end
