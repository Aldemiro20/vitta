<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Contact;

class ContactController extends Controller
{

    private $loggedUser;

    public function _construct(){
        $this->middleware("auth:api");
        $this->$loggedUser=auth()->user();
    }

    public function create(Request $request){
        $array=["error"=>""];
        $validator=Validator::make($request->all(),[
            'name'=>"required",
            'email'=>"required|email",
            'telephone'=>"required",
        ]);

        if(!$validator->fails()){
            $name=$request->input("name");
            $email=$request->input("email");
            $telephone=$request->input("telephone");

            $emailExists=Contact::where("email",$email)->count();
            if($emailExists===0){
                

                $newUser=new Contact();
                $newUser->name=$name;
                $newUser->email=$email;
                $newUser->telephone=$telephone;
                $newUser->save();

               
                $array['code']="200";
                    

            }else{
                $array["error"]="paciente ja cadastrado";
                return $array;
            }

        }else{
            $array["error"]="Dados incorretos";
            return $array;
        }


        return $array;
    }

    public function list(Request $request){
        $array=['error'=>""];
        $contact=Contact::all();

        $array['data']=$contact;

        return $array;
    }
 }
