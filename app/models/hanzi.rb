# -*- coding: UTF-8 -*-

class Hanzi
  include MongoMapper::Document
  key :simp,    String
  key :trad,    String
  key :pinyin,  String
  key :meaning, String
end
