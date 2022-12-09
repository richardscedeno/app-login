<?php
    class Usuario_Control {
        public $Usuario_Model = null;
        public function __construct() {
            $this -> usuario_model = new Usuario_Model();
        }

        public function login($f3) {
            $usr = $f3 -> get('POST.usr');
            $pass = $f3 -> get('POST.pass');
            $message = '';
            $data = array();
            
            $response = $this -> usuario_model -> load(['usu_usuario = ? AND us_clave = ?', $usr, $pass]);
            if (!$response) {
                $message = 'Usuario o contraseña inválido';
                echo json_encode ([
                    'message' => $message
                ]);
                return;
            }

            $message = 'Usuario encontrado';
            $data = $this -> usuario_model -> cast();

            echo json_encode ([
                'message' => $message,
                'info' => [
                    'data' => $data
                ]
            ]);
        }
    }
?>
