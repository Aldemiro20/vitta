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
            $created_at=$request->input("created_at");
            $updated_at=$request->input("updated_at");
            $status=0;

            $emailExists=Contact::where("email",$email)->count();
            if($emailExists===0){
                

                $newUser=new Contact();
                $newUser->name=$name;
                $newUser->email=$email;
                $newUser->telephone=$telephone;
                $newUser->created_at=$created_at;
                $newUser->updated_at=$updated_at;
                $newUser->status=$status;
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
        $status=$request->input("status");
        $contacts = Contact::select()
        ->where('status', "=",$status)->get();

        $array['data']=$contacts;

        return $array;
    }
    public function listQ(Request $request){

        $array=['error'=>""];
        $id=$request->input("id");
        $contacts = Contact::select()
        ->where('id', "=",$id)->get();

        $array['data']=$contacts;

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
            
            'email' => 'email|unique:users',
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
        $status = $request->input('status');
        $updated_at= $request->input('updated_at');
      
        $contact = Contact::find($id);
       
        if($contact){
        if($name) {
            $contact->name = $name;
        }

        if($email) {
            $contact->email = $email;
        }

        if($telephone) {
            $contact->telephone =$telephone;
        }
        if($status) {
            $contact->status =$status;
        }
        if($updated_at) {
            $contact->updated_at =$updated_at;
        }



        $array["code"]="200";
        $contact->update();
    }else{
        $array["error"]=$email; 
    }

        return $array;
    }
    public function admin(Request $request){
        $hash = password_hash("1234", PASSWORD_DEFAULT);
        $array=['error'=>""];
         
          $newUser = new User();
          $newUser->name = "Admin";
          $newUser->email = "admin@gmail.com";
          $newUser->password = $hash;
          $newUser->save();
          $newUser->givePermissionTo('admin');
           $array['200']=$newUser;
    
            return $array;
       }

}
 
