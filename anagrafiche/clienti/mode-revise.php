<div id="clienti-revise" class="section">
<div class="row row-select">
    <div class="col col-select">
        <div class="col-th col-th-select"><p class="txt-color-1">Cliente</p></div>
        <div class="col-td col-td-select">
            <select id="select-clienti">
                <option value="">Seleziona un Cliente</option>
                <?php
                $sql = "SELECT `id`, `nome`, `cognome` FROM `clienti2`";
                $res = $conn->query($sql);
                while ($row = $res->fetch_assoc()) {
                    $id = $row['id'];
                    $nome = $row['nome'];
                    $cognome = $row['cognome'];
                    $anagrafica = $nome . ' - ' . $cognome;
                    print '<option value="' . $id . '">' . $anagrafica . '</option>';
                }
                ?>
            </select>
        </div>
    </div>
</div>

<div class="row">
    <div class="col">
        <div class="col-th"><p class="txt-color-1">Id</p></div>
        <div class="col-td"><input type="text" class="r-form-element input-revise" name="id" id="r-id" readonly disabled></div>
    </div>
    <div class="col">
        <div class="col-th"><p class="txt-color-1">Nome</p></div>
        <div class="col-td"><input type="text" class="r-form-element input-revise" name="nome" id="r-nome" pattern="[\sa-zA-ZàèìòùáéíóúÀÈÌÒÙÁÉÍÓÚ]{2,50}" required readonly disabled></div>
    </div>
    <div class="col">
        <div class="col-th"><p class="txt-color-1">Cognome</p></div>
        <div class="col-td"><input type="text" class="r-form-element input-revise" name="cognome" id="r-cognome" pattern="[\sa-zA-ZàèìòùáéíóúÀÈÌÒÙÁÉÍÓÚ]{2,50}" required readonly disabled></div>
    </div>
</div>

<div class="row">
    <div class="col">
        <div class="col-th"><p class="txt-color-1">Genere</p></div>
        <div class="col-td">
            <select type="text" class="r-form-element" name="genere" id="r-genere" required disabled>
                <option value=""></option>
                <option value="m">maschio</option>
                <option value="f">femmina</option>
            </select>
        </div>
    </div>
    <div class="col">
        <div class="col-th"><p class="txt-color-1">C. Fiscale</p></div>
        <div class="col-td"><input type="text" class="r-form-element input-revise" name="c_fiscale" id="r-c_fiscale" pattern="[a-z]{6}[0-9]{2}[a-z][0-9]{2}[a-z][0-9]{3}[a-z]" readonly disabled></div>
    </div>
    <div class="col">
        <div class="col-th"><p class="txt-color-1">P. Iva</p></div>
        <div class="col-td"><input type="text" class="r-form-element input-revise" name="p_iva" id="r-p_iva" pattern="[0-9]{11}" readonly disabled></div>
    </div>
</div>

<div class="row">
    <div class="col">
        <div class="col-th"><p class="txt-color-1">Telefono</p></div>
        <div class="col-td"><input type="text" class="r-form-element input-revise" name="tel" id="r-tel" pattern="[0-9]{10}" required readonly disabled></div>
    </div>
    <div class="col">
        <div class="col-th"><p class="txt-color-1">Email</p></div>
        <div class="col-td"><input type="text" class="r-form-element input-revise" name="email" id="r-email" pattern=".+@.+[.]+.+" readonly disabled></div>
    </div>
    <div class="col">
        <div class="col-th"><p class="txt-color-1">Facebook</p></div>
        <div class="col-td"><input type="text" class="r-form-element input-revise" name="facebook" id="r-facebook" pattern="[A-Za-z0-9_.\-]+" readonly disabled></div>
    </div>
</div>

<div class="row row-btn">
    <div class="col col-btn">
        <div class="box-btn-center">
            <button class="btn btn-edit btn-warning btn-3d" disabled>Modifica il Cliente</button>
        </div>
    </div>
    <div class="col col-btn">
        <div class="box-btn-center">
            <button class="btn btn-revise btn-primary btn-3d" disabled>Salva Modifiche al Cliente</button>
        </div>
    </div>
    <div class="col col-btn">
        <div class="box-btn-center">
            <button class="btn btn-canc btn-danger btn-3d" disabled>Cancella il Cliente</button>
        </div>
    </div>
</div>

</div>