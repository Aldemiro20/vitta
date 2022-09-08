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
        $this->loggedUser=auth()->user();
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
                $array["error"]="Paciente ja cadastrado";
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

    public function delete(Request $request) {
        $id=$request->input("id");
        $array=['error'=>""];
        $contact=Contact::find($id);
        if($contact){
            $contact->delete();
            $array['code']="200";
            $array['mensagem']="Contacto apagado";
            return $array;
        }else{
            $array['error']="Contacto nao existe";
            return $array;
        }
       


        
    }


    public function search(Request $request) {
        $array = ['error'=>'', 'list'=>[]];

        $q = $request->input('q');

        if($q) {

            $contacts = Contact::select()
                ->where('name', 'LIKE', '%'.$q.'%')
            ->get();



            $array['list'] = $contacts;
        } else {
            $array['error'] = 'Digite algo para buscar';
        }

        return $array;
    }

    public function update(Request $request) {
        $array=["error"=>""];

       
        $rules = [
            'name' => 'min:2',
            'email' => 'email|unique:users',
            'telephone' => 'telephone',
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()) {
            $array['error'] = $validator->messages();
            return $array;
        }

        $name = $request->input('name');
        $email = $request->input('email');
        $telephone = $request->input('telephone');
        $id = $request->input('id');

        $contact = Contact::find($id);

        if($name) {
            $contact->name = $name;
        }

        if($email) {
            $contact->email = $email;
        }

        if($telephone) {
            $contact->telephone =$telephone;
        }
        $contact->save();

        return $array;
    }
}
 
