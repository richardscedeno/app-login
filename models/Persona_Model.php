<?php 
    class Persona_Model extends \DB\SQL\Mapper {
        public function __construct() {
            parent::__construct(\Base::instance() -> get('DB'),'tb_persona');
        }
    }
?>
