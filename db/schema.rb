# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161208175419) do

  create_table "bank_accounts", force: :cascade do |t|
    t.integer  "client_id"
    t.string   "currency"
    t.decimal  "amount"
    t.integer  "type"
    t.boolean  "is_blocked"
    t.boolean  "is_hidden"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cards", force: :cascade do |t|
    t.integer  "bank_account_id"
    t.string   "number"
    t.boolean  "is_blocked"
    t.boolean  "is_hidden"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "clients", force: :cascade do |t|
    t.string   "last_name"
    t.string   "first_name"
    t.string   "middle_name"
    t.date     "birth_at"
    t.integer  "status",      default: 0
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "employees", force: :cascade do |t|
    t.string   "email",                           null: false
    t.string   "crypted_password"
    t.string   "salt"
    t.boolean  "is_blocked"
    t.integer  "role"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "remember_me_token"
    t.datetime "remember_me_token_expires_at"
    t.string   "reset_password_token"
    t.datetime "reset_password_token_expires_at"
    t.datetime "reset_password_email_sent_at"
    t.index ["email"], name: "index_employees_on_email", unique: true
    t.index ["remember_me_token"], name: "index_employees_on_remember_me_token"
    t.index ["reset_password_token"], name: "index_employees_on_reset_password_token"
  end

end
