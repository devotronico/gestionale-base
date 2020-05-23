<?php

class Pager {
	/**
	 * Pagina attuale.
	 *
	 * @var int
	 * @access private
	 * @since 1.0
	 */
	private $_currentPage = 0;

	/**
	 * Il numero totale di righe.
	 *
	 * @var int
	 * @access private
	 * @since 1.0
	 */
	private $_totalRows = 0;

	/**
	 * Il numero di pagine precedenti a quella attuale da stampare.
	 *
	 * @var int
	 * @access private
	 * @since 1.0
	 */
	private $_prevLink = 2;

	/**
	 * Il numero di pagine successiva a quella attuale da stampare.
	 *
	 * @var int
	 * @access private
	 * @since 1.0
	 */
	private $_nextLink = 2;

	/**
	 * Il valore di OFFSET nella query SQL.
	 *
	 * @var int
	 * @access private
	 * @since 1.0
	 */
	private $_queryLimit = 0;

	/**
	 * Il numero di righe da stampare in ogni pagina.
	 *
	 * @var int
	 * @access private
	 * @since 1.0
	 */
	private $_numPerPage = 0;

    /**
     * I link delle pagine reindirizzeranno qui.
     *
     * @var string
     * @access private
     * @since 1.0
     **/
    private $_redirectTo = '';

	/**
	 * Pager::__construct(). Inizializza le variabili.
	 *
	 * @param int $currentPage
	 * @param int $totalRows
	 * @param int $numPerPage
	 * @since 1.0
	 */
	public function __construct($currentPage, $totalRows=null, $numPerPage=50, $redirectTo='index.php?') {
		$this->_currentPage = (int) max($currentPage, 1);
		if($totalRows !== null)
		  $this->_totalRows = (int) max($totalRows, 1);

		$this->_numPerPage = (int) $numPerPage;
        $this->_redirectTo = $redirectTo;
	}

	/**
	 * Pager::getOffset(). Restituisce il numero totale di pagine che verranno create.
	 *
	 * @return int
	 * @since 1.0
	 */
	public function setTotalRows($totalRows) {
	    $this->_totalRows = (int) max($totalRows, 1);
	}



	public function getOffset() {
		return ceil($this->_totalRows/$this->_numPerPage);
	}

	/**
	 * Pager::getQueryOffset(). Restituisce l'offset da usare nella query SQL.
	 *
	 * @return int
	 * @since 1.0
	 */
	public function getQueryOffset() {
        return ($this->_currentPage == 1) ? $this->_queryLimit : ($this->_currentPage - 1) * $this->_numPerPage;
    }

	/**
	 * Pager::getPager(). Stampa la paginazione.
	 *
	 * @return void
	 * @since 1.0
	 */
	public function getPager() {
        $currentPage = $this->_currentPage;
        $prev = $this->_prevLink;
        $next = $this->_nextLink;
        $total = $this->getOffset();

        echo '<div class="pagination no-print" style="text-align:center;">';
        echo '<ul>';

        $this->getFirst();
        $this->getPrev();

        if($total < ($prev + $next + 1)) {
            $prev = 0;
            $next = 0;
            for($i = $total; $i > 0; $i--) {
                $return[$i] = $i;
            }
        } else {
            if($currentPage == $total) {
                if($currentPage - ($prev + $next + 1) >= 0) {
                    for($i = $total; $i > ($total - ($prev + $next + 1)); $i--) {
                        $return[$i] = $i;
                    }
                }
            } else if($currentPage < $total) {
                if($currentPage - $prev > 0) {
                    for($i = $currentPage - $prev; $i <    $currentPage + $next + 1; $i++) {
                        $return[$i] = $i;
                    }
                } else if($currentPage - $prev <= 0) {
                    for($i = 1; $i <= ($prev + $next + 1); $i++) {
                        $return[$i] = $i;
                    }
                }
            }
        }

        if(!empty($return)) { sort($return); }

        for($i = 0; $i < count($return); $i++) {
            if($return[$i] != $this->_currentPage)
                echo '<li class="number-page"><a href="#" data-gotopage="' . $return[$i] .'" class="link-gotopage">'. $return[$i] .'</a></li>';
            else
                echo '<li class="actual-page disabled">'. $return[$i] .'</li>';
        }

        $this->getNext();
        $this->getLast();

        echo '</ul>';
        echo '</div>';
        echo '<div class="clearer"></div>';
    }

	/**
	 * Pager::getFirst(). Stampa il link alla prima pagina.
	 *
	 * @return void
	 * @since 1.0
	 */
	public function getFirst() {
        if($this->_currentPage != 1)
            echo '<li class="first-page"><a href="#" data-gotopage="1" class="link-gotopage" title="Inizio">&#171; Inizio</a></li>';
        else
            echo '<li class="first-page disabled">&#171; Inizio</li>' ;
    }

	/**
	 * Pager::getFirst(). Stampa il link all'ultima pagina.
	 *
	 * @return void
	 * @since 1.0
	 */
	public function getLast() {
        if($this->_currentPage != $this->getOffset())
            echo '<li class="last-page"><a href="#" data-gotopage="' . $this->getOffset() . '" class="link-gotopage" title="Fine">Fine &#187;</a></li>';
        else
            echo '<li class="last-page disabled">Fine &#187;</li>';
    }

	/**
	 * Pager::getFirst(). Stampa il link alla pagina precedente a quella attuale.
	 *
	 * @return string
	 * @since 1.0
	 */
	public function getPrev() {
        if($this->_currentPage - 1 > 0)
            echo '<li class="prev-page"><a href="#" data-gotopage="' . ($this->_currentPage - 1) . '" class="link-gotopage" title="Precedente">&lt; Precedente</a></li>';
        else
            echo '<li class="prev-page disabled" >&lt; Precedente</li>';
    }

	/**
	 * Pager::getFirst(). Stampa il link alla pagina successiva a quella attuale.
	 *
	 * @return string
	 * @since 1.0
	 */
	public function getNext() {
        if($this->_currentPage + 1 <= $this->getOffset())
            echo '<li class="next-page"><a href="#" data-gotopage="' . ($this->_currentPage + 1) . '" class="link-gotopage" title="Successiva">Successiva &gt;</a></li>';
        else
            echo '<li class="next-page disabled">Successiva &gt;</li>';
    }

    public function getNumPerPage(){

        return $this->_numPerPage;
    }
}
?>