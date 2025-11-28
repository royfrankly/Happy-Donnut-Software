<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\User;

class CommentController extends Controller
{
    public function index(User $usuario)
    {
        return response()->json($usuario->comments()->with('user')->latest()->get());
    }

    public function store(Request $request, User $usuario)
    {
        $data = $request->validate([
            'content' => 'required|string',
        ]);

        $data['user_id'] = $usuario->id;
        $comment = Comment::create($data);
        return response()->json($comment->load('user'), 201);
    }
}
