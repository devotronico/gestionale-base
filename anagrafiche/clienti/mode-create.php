<div id="clienti-create" class="section">
    <div class="row">
        <div class="col">
            <div class="col-th">
                <p class="txt-color-1">Id</p>
            </div>
            <div class="col-td"><input type="text" class="c-form-element input-create" name="id" id="c-id" readonly></div>
        </div>
        <div class="col">
            <div class="col-th">
                <p class="txt-color-1">Nome</p>
            </div>
            <div class="col-td"><input type="text" class="c-form-element input-create" name="nome" id="c-nome" placeholder="nome" pattern="[\sa-zA-ZàèìòùáéíóúÀÈÌÒÙÁÉÍÓÚ]{2,50}" required></div>
        </div>
        <div class="col">
            <div class="col-th">
                <p class="txt-color-1">Cognome</p>
            </div>
            <div class="col-td"><input type="text" class="c-form-element input-create" name="cognome" id="c-cognome" placeholder="cognome" pattern="[\sa-zA-ZàèìòùáéíóúÀÈÌÒÙÁÉÍÓÚ]{2,50}" required></div>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <div class="col-th">
                <p class="txt-color-1">Genere</p>
            </div>
            <div class="col-td">
                <select type="text" class="c-form-element" name="genere" id="c-genere" required>
                    <option value="">scegli genere</option>
                    <option value="m">maschio</option>
                    <option value="f">femmina</option>
                </select>
            </div>
        </div>
        <div class="col">
            <div class="col-th">
                <p class="txt-color-1">C. Fiscale</p>
            </div>
            <div class="col-td"><input type="text" class="c-form-element input-create" name="c_fiscale" id="c-c_fiscale" placeholder="codice fiscale" pattern="[a-z]{6}[0-9]{2}[a-z][0-9]{2}[a-z][0-9]{3}[a-z]"></div>
        </div>
        <div class="col">
            <div class="col-th">
                <p class="txt-color-1">P. Iva</p>
            </div>
            <div class="col-td"><input type="text" class="c-form-element input-create" name="p_iva" id="c-p_iva" placeholder="partita iva" pattern="[0-9]{11}"></div>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <div class="col-th">
                <p class="txt-color-1">Telefono</p>
            </div>
            <div class="col-td"><input type="tel" class="c-form-element input-create" name="tel" id="c-tel" placeholder="telefono" pattern="[0-9]{10}" required></div>
        </div>
        <div class="col">
            <div class="col-th">
                <p class="txt-color-1">Email</p>
            </div>
            <div class="col-td"><input type="email" class="c-form-element input-create" name="email" id="c-email" placeholder="email" pattern="\S+@\S+\.[a-z]+"></div>
        </div>
        <div class="col">
            <div class="col-th">
                <p class="txt-color-1">Facebook</p>
            </div>
            <div class="col-td"><input type="text" class="c-form-element input-create" name="facebook" id="c-facebook" placeholder="facebook" pattern="[A-Za-z0-9_.\-]+"></div>
        </div>
    </div>

    <div class="row row-btn ">
        <div class="col col-btn">
            <div class="box-btn-center">
                <button class="btn btn-create btn-primary btn-3d" disabled>Crea il Cliente</button>
            </div>
        </div>
    </div>

</div>