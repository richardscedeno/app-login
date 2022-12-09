<?php 
    class Menu_Control {
        public $Menu_Model = null;
        public function __construct() {
            $this -> menu_model = new Menu_Model();
        }

        public function getMenu($f3) {
            $result = $this -> menu_model -> find();
            $items = array();

            foreach($result as $menu) {
                $items[] = $menu -> cast();
            }
            
            echo json_encode([
                'msg' => count($items)>0 ? 'Succsess' : 'No data to show',
                'total' => count($items),
                'info' => [
                    'info' => $items
                ]
            ]);
        }

        public function getMenuById($f3) {
            $paramsID = $f3 -> get('PARAMS.id');
            $response =  $this -> menu_model -> load(['men_id = ?', $paramsID]);
            $message = '';
            $data = array();

            if ($response === false) {
                $message = 'No existe menu con ese id';
                echo json_encode ([
                    'message' => $message
                ]);
                return;
            }

            $message = 'Menu encontrado';
            $data = $this -> menu_model -> cast();

            echo json_encode([
                'message' => $message,
                'info' => [
                    'data' => $data
                ]
            ]);
        }
    }
?>
