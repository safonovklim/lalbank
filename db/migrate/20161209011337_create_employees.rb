class CreateEmployees < ActiveRecord::Migration[5.0]
  def change
    create_table :employees do |t|
      t.string :username
      t.integer :role, default: 0
      t.string :password_digest

      t.timestamps
    end
    add_index :employees, :username, :unique => true
  end
end
