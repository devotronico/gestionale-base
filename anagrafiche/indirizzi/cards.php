
<!-- <CARDS> -->
<div class="box-btn-center">
    <button class="btn btn-new btn-success btn-3d">Aggiungi Nuovo Indirizzo<span class="btn-symbol">+</span></button>
</div>
<div id="cards" class="wrapper wrapper-3">
<!-- <ADD> -->
<div class="card indirizzi-add">
<table class="card-table table-add">
    <tbody>
        <tr class="tr-add">
            <th colspan="2" class="th-title th-add">
              <div class="box-title box-title-add">
                <h3 class="title">Aggiungi Indirizzo</h3>
                <button class="btn btn-close btn-close-add">&#10006;</button>
              </div>
          </th>
        </tr>
        <tr class="tr-add">
            <th class="th-add"><p>Id Cliente</p></th>
            <td class="td-add">
                <div class="box-add">
                    <input type="text" class="card-input card-input-add" id="add-cliente_id" value="0" readonly>
                </div>
            </td>
        </tr>

        <tr class="tr-add">
            <th class="th-add"><p>Principale</p></th>
            <td class="td-add">
                <div class="box-add">
                    <input type="checkbox" name="add-principale" id="add-principale">
                    <label for="add-principale">SI</label>
                </div>
            </td>
        </tr>

        <tr class="tr-add">
            <th class="th-add"><p>Via/Corso...</p></th>
            <td class="td-add">
                <div class="box-add">
                    <input type="text" class="card-input card-input-add" id="add-via" placeholder="via,viale,corso,piazza..." pattern="[a-zA-Z\s]{2,100}" required>
                    <span class="validity"></span>
                </div>
            </td>
        </tr>

        <tr class="tr-add">
            <th class="th-add"><p>Civico</p></th>
            <td class="td-add">
                <div class="box-add">
                    <input type="text" class="card-input card-input-add" id="add-civico" placeholder="civico" pattern="[a-zA-Z0-9]{1,8}?">
                    <span class="validity"></span>
                </div>
            </td>
        </tr>

        <tr class="tr-add">
            <th class="th-add"><p>Cap</p></th>
            <td class="td-add">
                <div class="box-add">
                    <input type="text" class="card-input card-input-add" id="add-cap" placeholder="cap" pattern="[0-9]{5}" required>
                    <span class="validity"></span>
                </div>
            </td>
        </tr>

        <tr class="tr-add">
            <th class="th-add"><p>Comune</p></th>
            <td class="td-add">
                <div class="box-add">
                    <input type="text" class="card-input card-input-add" id="add-comune" placeholder="comune" pattern="[a-zA-Z\s]{2,100}" required>
                    <span class="validity"></span>
                </div>
            </td>
        </tr>

        <tr class="tr-add">
            <th class="th-add"><p>Provincia</p></th>
            <td class="td-add">
                <div class="box-add">
                    <input type="text" class="card-input card-input-add" id="add-provincia" placeholder="provincia" pattern="[a-zA-Z]{2}" required>
                    <span class="validity"></span>
                </div>
            </td>
        </tr>

        <tr class="tr-add">
            <th class="th-add"><p>Nazione</p></th>
            <td class="td-add">
                <div class="box-add">
                    <input type="text" class="card-input card-input-add" id="add-nazione" placeholder="nazione" pattern="[a-zA-Z]{2}">
                    <span class="validity"></span>
                </div>
            </td>
        </tr>

        <tr class="tr-add">
            <th class="th-add"><p>Azione</p></th>
            <td class="td-add">
                <div class="box-btn box-btn-center">
                    <button class="btn btn-card-add btn-success btn-3d" disabled>Aggiungi un nuovo Indirizzo</button>
                </div>
            </td>
        </tr>
    </tbody>
</table>
</div>
<!-- </ADD> -->


<!-- <EDIT> -->
<div class="card indirizzi-edit">
    <table class="card-table table-edit">
    <tbody>
    <tr class="tr-edit">
            <th colspan="2" class="th-title th-edit">
              <div class="box-title box-title-edit">
              <h3 class="title">Modifica Indirizzo</h3><button class="btn btn-close btn-close-edit">&#10006;</button>
              </div>
          </th>
        </tr>
        <tr class="tr-edit">
            <th class="th-edit"><p>Id Indirizzo</p></th>
            <td class="td-edit">
                <div class="box-edit">
                    <input type="text" class="card-input card-input-add" id="edit-indirizzo_id" readonly>
                </div>
            </td>
        </tr>

        <tr class="tr-edit">
            <th class="th-edit"><p>Principale</p></th>
            <td class="td-edit">
                <div class="box-edit">
                    <input type="checkbox" name="edit-principale" id="edit-principale">
                    <label for="edit-principale">SI</label>
                </div>
            </td>
        </tr>

        <tr class="tr-edit">
            <th class="th-edit"><p>Via/Corso...</p></th>
            <td class="td-edit">
                <div class="box-edit">
                    <input type="text" class="card-input card-input-edit" id="edit-via" placeholder="via,viale,corso,piazza..." pattern="[a-zA-Z\s]{2,100}" title="I numeri non sono ammessi." required>
                    <span class="validity"></span>
                </div>
            </td>
        </tr>

        <tr class="tr-edit">
            <th class="th-edit"><p>Civico</p></th>
            <td class="td-edit">
                <div class="box-edit">
                    <input type="text" class="card-input card-input-edit" id="edit-civico" placeholder="civico" pattern="[a-zA-Z0-9]{1,8}?">
                    <span class="validity"></span>
                </div>
            </td>
        </tr>

        <tr class="tr-edit">
            <th class="th-edit"><p>Cap</p></th>
            <td class="td-edit">
                <div class="box-edit">
                    <input type="text" class="card-input card-input-edit" id="edit-cap" placeholder="cap" pattern="[0-9]{5}" required>
                    <span class="validity"></span>
                </div>
            </td>
        </tr>

        <tr class="tr-edit">
            <th class="th-edit"><p>Comune</p></th>
            <td class="td-edit">
                <div class="box-edit">
                    <input type="text" class="card-input card-input-edit" id="edit-comune" placeholder="comune" pattern="[a-zA-Z\s]{2,100}" required>
                    <span class="validity"></span>
                </div>
            </td>
        </tr>

        <tr class="tr-edit">
            <th class="th-edit"><p>Provincia</p></th>
            <td class="td-edit">
                <div class="box-edit">
                    <input type="text" class="card-input card-input-edit" id="edit-provincia" placeholder="provincia" pattern="[a-zA-Z]{2}" required>
                    <span class="validity"></span>
                </div>
            </td>
        </tr>

        <tr class="tr-edit">
            <th class="th-edit"><p>Nazione</p></th>
            <td class="td-edit">
                <div class="box-edit">
                    <input type="text" class="card-input card-input-edit" id="edit-nazione" placeholder="nazione" pattern="[a-zA-Z]{2}">
                    <span class="validity"></span>
                </div>
            </td>
        </tr>

        <tr class="tr-edit">
            <th class="th-edit"><p>Azione</p></th>
            <td class="td-edit">
                <div class="box-btn box-btn-center">
                    <button class="btn btn-card-update btn-warning btn-3d" disabled>Salva Indirizzo Modificato</button>
                </div>
            </td>
        </tr>
    </tbody>
</table>
</div>
<!-- </EDIT> -->

<!-- <VIEW> -->
<div class="card indirizzi-view">
    <table class="card-table table-view">
        <tbody>
            <tr class="tr-view">
                <th colspan="2" class="th-title th-view">
                    <div class="box-title box-title-view">
                        <h3 class="title">Mostra Indirizzo</h3><button class="btn btn-close btn-close-view">&#10006;</button>
                    </div>
                </th>
            </tr>
            <tr class="tr-view">
            <th class="th-view"><p>Indirizzo<br>Completo</p></th>
                <td class="td-edit">
                    <div class="box-view">
                        <p class="view-address"></p>
                    </div>
                </td>
            </tr>
            <tr class="tr-view">
                <th class="th-view"><p>Azione</p></th>
                <td class="td-edit">
                    <div class="box-btn box-btn-center">
                        <button class="btn btn-card-map btn-primary btn-3d">Cartina</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div id="map"></div>
</div>
<!-- </VIEW> -->
</div>
<!-- <CARDS> -->
