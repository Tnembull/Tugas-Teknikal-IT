<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProducts extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Id (int) PK
            $table->string('product_name', 150); // Product_name (varchar 150) NotNull
            $table->string('category', 100); // Category (varchar 100) NotNull
            $table->decimal('price', 10, 2); // Price (numeric) NotNull
            $table->float('discount')->nullable(); // Discount (float) Null
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
