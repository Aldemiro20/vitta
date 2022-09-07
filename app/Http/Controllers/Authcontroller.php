<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class Authcontroller extends Controller
{
    public function _construct(){
        $this->Middleware("auth:api", ["except"=>["create", "login", "unauthourized"]]);
    }
    public function create(Request $request){
        $array=["error"=>""];
        $validator=Validator::make($request->all(),[
            'name'=>"required",
            'email'=>"required|email",
            'password'=>"required",
        ]);

        if(!$validator->fails()){
            $name=$request->input("name");
            $email=$request->input("email");
            $password=$request->input("password");

            $emailExists=User::where("email",$email)->count();
            if($emailExists===0){
                $hash=password_hash($password, PASSWORD_DEFAULT);

                $newUser=new User();
                $newUser->name=$name;
                $newUser->email=$email;
                $newUser->password=$hash;
                $newUser->save();

                $token=auth()->attempt([
                    "email"=>$email,
                    "password"=>$password,
                ]);

                if(!$token){
                    $array['error']="Ocorreu um erro!";
                    return $array;
                }

                $info=auth()->user();
                $array['data']=$info;
                $array['token']=$token;

            }else{
                $array["error"]="Email ja cadastrado";
                return $array;
            }

        }else{
            $array["error"]="Dados incorretos";
            return $array;
        }


        return $array;
    }

    public function login(Request $request){
        $array=["error"=>""];

        $email=$request->input("email");
        $password=$request->input("password");

        $token=auth()->attempt([
            "email"=>$email,
            "password"=>$password
        ]);

        if(!$token){
            $array["error"]="Usuario ou senha errados";
            return $array;
        }

        $info=auth()->user();
        $array['data']=$info;
        $array['token']=$token;


        return $array;
    }

    public function logout(){
        auth()->logout();
        return ['error'=>""];
    }

    public function refresh(){
        $array=["error"=>""];
        $token=auth()->refresh();

        $info=auth()->user();
        $array['data']=$info;
        $array['token']=$token;

        return $array;
    }

    public function unauthourized(){
        return response()->json([
            'error'=>"Não autorizado"
        ], 401);
    }
}
