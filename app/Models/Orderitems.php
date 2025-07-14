<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orderitems extends Model
{
    use HasFactory;
    protected $table='orderitems_';
    protected $fillable=[
        'order_id',
        'book_id',
        'quantity',
        'price'
    ];
    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id', 'id');
    }
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
}
