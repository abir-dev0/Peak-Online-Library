<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $table='books';
    protected $primaryKey='id';
    protected $fillable = [
            'title',
            'description',
            'format',
            'published',
            'ISBN',
            'categorie',
            'author',
            'language',
            'photo',
            'price'];

    public function orders(){
        return $this->belongsToMany(Order::class);
    }
}
