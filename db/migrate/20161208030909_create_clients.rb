class CreateClients < ActiveRecord::Migration[5.0]
  def change
    create_table :clients do |t|
      t.string :username
      t.string :password_digest

      t.string :last_name
      t.string :first_name
      t.string :middle_name
      t.date :birth_at
      t.integer :status, default: 0

      t.timestamps
    end
    add_index :clients, :username, :unique => true
  end
end
