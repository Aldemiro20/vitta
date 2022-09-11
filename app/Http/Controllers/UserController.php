<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Contact;
use App\Models\User;


class UserController extends Controller
{
    private $loggedUser;

    public function __construct() {
        $this->middleware('auth:api');
        $this->loggedUser = auth()->user();
    }

    public function read() {
        $array = ['error' => ''];

        $info = $this->loggedUser;
        $info['avatar'] = url('media/avatars/'.$info['avatar']);
        $array['data'] = $info;

        return $array;
    }
   
    public function listId(Request $request){

       
       $array=['error'=>""];
       $id=$request->input("id");
       $status=$request->input("status");
       if($status==1){
        $user = Contact::select()
        ->where('id', "=",$id)->get();
       }else{
        $user = User::select()
        ->where('id', "=",$id)->get();
       }
       
       $array['data']=$user;
   
       return $array;
        
    }

    public function delete(Request $request) {
        $array=['error'=>""];
        $id=$request->input("id");

        $contact=User::find($id);

        if($contact){
            $contact->delete();
            $array['code']="200";
            $array['mensagem']="usuario apagado";
        }else{
            $array['error']="Usuario nao existe";
            }
    return $array;
}
    

public function update(Request $request) {
    $array=["error"=>""];

    $rules = [
        'name' => 'min:2',
        'email' => 'email|unique:users',
        'password' => 'same:password_confirm',
        'password_confirm' => 'same:password'
    ];

    $validator = Validator::make($request->all(), $rules);

    if($validator->fails()) {
        $array['error'] = $validator->messages();
        return $array;
    }

    $name = $request->input('name');
    $email = $request->input('email');
    $password = $request->input('password');
    $password_confirm = $request->input('password_confirm');
    $id = $request->input('id');

    $user = User::find("2");

    if($name) {
        $user->name = $name;
    }

    if($email) {
        $user->email = $email;
    }

    if($password) {
        $user->password = password_hash($password, PASSWORD_DEFAULT);
    }

    $user->save();


    return $array;
}

public function list(Request $request){

    $array=['error'=>""];
    $status=$request->input("status");
    if($status==1){
        $user = Contact::all();
    }else{
        $user = User::all();
    }
    
    $array['data']=$user;

    return $array;
}
    
}
