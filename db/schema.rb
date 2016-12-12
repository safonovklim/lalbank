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

ActiveRecord::Schema.define(version: 20161212020119) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bank_accounts", force: :cascade do |t|
    t.integer  "client_id"
    t.string   "currency"
    t.decimal  "amount",     default: "0.0"
    t.integer  "reason"
    t.boolean  "is_blocked", default: false
    t.boolean  "is_hidden",  default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "cards", force: :cascade do |t|
    t.integer  "bank_account_id"
    t.string   "card_number"
    t.integer  "status"
    t.date     "expire_at"
    t.string   "pin_hash"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["card_number"], name: "index_cards_on_card_number", unique: true, using: :btree
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

  create_table "employee_tokens", force: :cascade do |t|
    t.integer  "employee_id"
    t.datetime "expire_at"
    t.string   "token"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["token"], name: "index_employee_tokens_on_token", unique: true, using: :btree
  end

  create_table "employees", force: :cascade do |t|
    t.string   "username"
    t.integer  "role",            default: 0
    t.string   "password_digest"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["username"], name: "index_employees_on_username", unique: true, using: :btree
  end

  create_table "transaction_categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_transaction_categories_on_name", unique: true, using: :btree
  end

  create_table "transactions", force: :cascade do |t|
    t.integer  "bank_account_id"
    t.integer  "status"
    t.decimal  "amount"
    t.string   "currency"
    t.integer  "transaction_category_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

end
