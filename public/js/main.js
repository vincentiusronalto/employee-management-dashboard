(function() {

    //change selector based on route
    let firstPath = window.location.pathname.split('/')[1];
    if(!firstPath){
        firstPath = 'home'
    }
    document.getElementById('cuti').value = firstPath;


    function changeFilter(e){
        window.location.href = e.target.value;
    }
    let selectFilter = document.getElementById('cuti')
    selectFilter.addEventListener("change", changeFilter);    
    

    //on click edit - prepare text , csrf  
    function prepareEdit(e){
        let noinduk = e.target.getAttribute("data-noinduk");
        let csrfVal = document.getElementById('csrf').value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                let data = JSON.parse(this.responseText);
                // console.log(data);
                /*
                {
                    "no_induk": "IP06002",
                    "nama": "Amin",
                    "alamat": "Jln Imam Bonjol no 11, Mojokerto",
                    "tanggal_lahir2": "1977-09-03",
                    "tanggal_bergabung2": "2005-08-07"
                }
                */
                document.getElementById('fixed_noinduk').value = data.no_induk;
                document.getElementById('input_no_induk').value = data.no_induk;
                document.getElementById('input_nama').value = data.nama;
                document.getElementById('input_alamat').value = data.alamat;
                document.getElementById('input_tanggal_lahir').value = data.tanggal_lahir2;
                document.getElementById('input_tanggal_bergabung').value = data.tanggal_bergabung2;
                document.getElementById('create_or_edit').value = "edit";
                document.getElementById('btn_submit').value = "Edit";
                document.getElementById('tambah_karyawan').classList.add('editing_mode');
            }
        };
        xhttp.open("GET", `prepareEdit/${noinduk}`, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader('X-CSRF-Token',csrfVal);
        xhttp.send();
    }


    //get noinduk
    let iconsEdit = document.getElementsByClassName('icons-edit');
    for(let i=0; i < iconsEdit.length; i++){
        iconsEdit[i].addEventListener("click", prepareEdit)
    }

    //onclick cancel
    let cancelBtn = document.getElementById("btn_clear");

    function clearInput(){  
        document.getElementById('input_no_induk').value = "";
        document.getElementById('input_nama').value = "";
        document.getElementById('input_alamat').value = "";
        document.getElementById('input_tanggal_lahir').value = "";
        document.getElementById('input_tanggal_bergabung').value = "";
        document.getElementById('create_or_edit').value = "create";
        document.getElementById('btn_submit').value = "Add";
        document.getElementById('tambah_karyawan').classList.remove('editing_mode');
    }
    cancelBtn.addEventListener("click", clearInput);


    //on click remove/hapus kontak
    function prepareDelete(e){
        document.getElementById('remove_delete_noinduk').value = e.target.getAttribute("data-noinduk");
        // // Get the modal
        var modal = document.getElementById("myModal");

        // // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";

        // // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none";
        }

        let batal = document.getElementById('konfirmasi_batalkan');
        batal.onclick = function() {
            modal.style.display = "none";
            }

        // // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        }
    }

    let iconsDelete = document.getElementsByClassName('icons-delete');
    for(let i=0; i < iconsDelete.length; i++){
        iconsDelete[i].addEventListener("click", prepareDelete)
    }

    
    document.getElementById('cari_karyawan').focus();

    //on type search
    document.getElementById('cari_karyawan').onkeyup = function(e){
        let searchKeyword = e.target.value;
        // if(searchKeyword === ''){

        //     window.href.location = '/';
            
        // }
        let csrfVal = document.getElementById('csrf').value;
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {        
                let data = JSON.parse(this.responseText);
                if(data.length > 0){
                    console.log(data)
                    /*
                    [
    {
        "nama": "Amin",
        "no_induk": "IP06002",
        "alamat": "Jln Imam Bonjol no 11, Mojokerto",
        "tanggal_lahir": "03-SEP-1977",
        "tanggal_bergabung": "07-AUG-2005",
        "total_cuti": "0",
        "sisa_cuti": "12"
    }
]
                    */
                   let build = '';
                   for(let i=0;i<data.length;i++){
                    build += 
                    `
                    <tr>
                            <td>${i+1}</td>
                            <td>${ data[i].no_induk}</td>
                            <td>${data[i].nama}</td>
                            <td>${data[i].alamat }</td>
                            <td>${data[i].tanggal_lahir }</td>
                            <td>${data[i].tanggal_bergabung }</td>
                            <td>${data[i].total_cuti }</td>
                            <td>${data[i].sisa_cuti}</td>
                            <td class="center-icons"><span class="material-icons icons-edit" data-noinduk="${data[i].no_induk}">edit</span></td>
                            <td class="center-icons"><span class="material-icons icons-delete" data-noinduk="${data[i].no_induk}">delete</span></td>
                    </tr>
                    `
                   }

                   let contentSearch = document.getElementById('content_search');
                   contentSearch.innerHTML = build;
                }
            }
        };
        xhttp.open("GET", `search/${searchKeyword}`, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader('X-CSRF-Token',csrfVal);
        xhttp.send();
    }


 })();