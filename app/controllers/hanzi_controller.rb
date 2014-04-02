# encoding: UTF-8
class HanziController < ApplicationController

  #---------------------------------------------------------------------------
  #
  #
  #
  #---------------------------------------------------------------------------
  def home
  end

  #---------------------------------------------------------------------------
  #
  #
  #
  #---------------------------------------------------------------------------
  def analizar
    render :home and return unless params[:texto].present?
    hanzis = Hash.new

    params[:texto].split(//).each do |c|
      if /\p{Han}/ =~ c
        hanzis[c] = hanzis[c].nil? ? 1 : hanzis[c] + 1
      end
    end
    @hanzis = hanzis.sort {|x,y| y[1] <=> x[1]}
  end

  #---------------------------------------------------------------------------
  #
  #
  #
  #---------------------------------------------------------------------------
  def show
  end

  #---------------------------------------------------------------------------
  #
  #
  #
  #---------------------------------------------------------------------------
  def export
    return unless params[:hanzis].present?
    send_data "// Exportado\n" + params[:hanzis].split(//).join("\n"),
              :type     => 'text/txt; charset=utf-8; header=present',
              :filename => "hanzis.txt"
  end
end
