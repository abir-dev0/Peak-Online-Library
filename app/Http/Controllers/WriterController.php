<?php

namespace App\Http\Controllers;

use App\Models\Writer;
use Illuminate\Http\Request;

class WriterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $writers=Writer::all();
        return response()->json($writers, 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $writer = Writer::create($validatedData);
        return response()->json($writer, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $writer = Writer::with('books')->find($id);

        if (!$writer) {
            return response()->json(['message' => 'Writer not found'], 404);
        }

        return response()->json($writer, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $writer = Writer::find($id);

        if (!$writer) {
            return response()->json(['message' => 'Writer not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
        ]);

        $writer->update($validatedData);
        return response()->json($writer, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $writer = Writer::find($id);

        if (!$writer) {
            return response()->json(['message' => 'Writer not found'], 404);
        }

        $writer->delete();
        return response()->json(['message' => 'Writer deleted successfully'], 200);
    }
}
