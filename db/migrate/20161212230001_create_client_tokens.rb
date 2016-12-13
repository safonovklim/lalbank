class CreateClientTokens < ActiveRecord::Migration[5.0]
  def change
    create_table :client_tokens do |t|
      t.integer :client_id
      t.datetime :expire_at
      t.string :token

      t.timestamps
    end
    add_index :client_tokens, :token, :unique => true
  end
end
