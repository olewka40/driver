pragma solidity ^0.5.0;
contract Driver {
    struct Driver {
        string FIO;
        uint licenseid;
        uint expire_date;
        uint category;
        uint experience_start;
        uint accidents;
        uint unpayed_fines;
        uint insurance_deposit;
        bool trafficpolice;
        bool insurancerequest;
        address payable solidityadr;
    }
    struct Vehicle {
        uint category;
        uint cost;
        uint exploitation;
        address owner;
    }
    struct Fine {
        uint id;
        uint time;
        bool finished;
        address driver;
    }
    struct Accident {
        uint id;
        uint insurance_cover;
        address payable driver;
        bool finished;
    }
    Driver[] drivers;
    Vehicle[] vehicles;
    Fine[] fines;
    Accident[] accidents;
    uint bankdebt = 0;
    uint insurancesum = 0;
    address payable bank_address = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    address payable insurance_address = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
    address default_adr = 0x0000000000000000000000000000000000000000;
    mapping(uint => address payable) LicenseToAddress;
    mapping(address  => uint) AddressToDriverId;
    mapping(address => uint) Rolecheck;
    mapping(address => uint[]) DriverFinesID;
    mapping(address => uint[]) DriverAccidentsID;
    mapping(uint => address) licenseid_busy;
    mapping(uint => uint) licenseid_expire;
    mapping(uint => uint) licenseid_category;
    mapping(address => uint) drivertovehicle;
    constructor() public {
        drivers.push(Driver("Иванов Иван Иванович",0,0,0,2018,0,0,0,true,false,0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db)); Rolecheck[0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db] = 1; AddressToDriverId[0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db] = drivers.length-1;
        drivers.push(Driver("Семенов Семен Семенович",0,0,0,2015,0,0,0,false,false,0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB)); Rolecheck[0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB] = 2; AddressToDriverId[0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB] = drivers.length-1;
        drivers.push(Driver("Петров Петр Петрович",0,0,0,2010,3,0,0,false,false,0x617F2E2fD72FD9D5503197092aC168c91465E7f2)); Rolecheck[0x617F2E2fD72FD9D5503197092aC168c91465E7f2] = 2; AddressToDriverId[0x617F2E2fD72FD9D5503197092aC168c91465E7f2] = drivers.length-1;
        licenseid_busy[0] = default_adr;licenseid_busy[111] = default_adr;licenseid_busy[222] = default_adr;licenseid_busy[333] = default_adr;licenseid_busy[444] = default_adr;licenseid_busy[555] = default_adr;licenseid_busy[666] = default_adr;
        licenseid_expire[0] = 11012021;licenseid_expire[111] = 12052025;licenseid_expire[222] = 9092020;licenseid_expire[333] = 13022027;licenseid_expire[444] = 10092020;licenseid_expire[555] = 24062029;licenseid_expire[666] = 31032030;
        licenseid_category[0] = 1;licenseid_category[111] = 2;licenseid_category[222] = 3;licenseid_category[333] = 1;licenseid_category[444] = 2;licenseid_category[555] = 3;licenseid_category[666] = 1;
    }
     function driverInfo() public view returns(string memory, uint, uint, uint, uint, uint, uint){
        require(Rolecheck[msg.sender] != 0,"Вы не зарегистрированы");
        return(drivers[AddressToDriverId[msg.sender]].FIO, drivers[AddressToDriverId[msg.sender]].licenseid, drivers[AddressToDriverId[msg.sender]].expire_date, drivers[AddressToDriverId[msg.sender]].category, drivers[AddressToDriverId[msg.sender]].experience_start, drivers[AddressToDriverId[msg.sender]].accidents, drivers[AddressToDriverId[msg.sender]].unpayed_fines);
    }
    function getFinesId() public view returns(uint[] memory ) {
        return(DriverFinesID[msg.sender]);
    }
    function getAccidentsId() public view returns(uint[] memory) {
        return(DriverAccidentsID[msg.sender]);
    }
    function getFine(uint fineID) public view returns(uint, bool) {
        return(fines[fineID].id, fines[fineID].finished);
    }
    function getAccident(uint accidentID) public view returns(uint, uint) {
        return(accidents[accidentID].id,accidents[accidentID].insurance_cover);
    }
    function driverRegistration(string memory FIO, uint experience_start, uint road_accidents, uint unpayed_fines) public returns(string memory){
        require(Rolecheck[msg.sender] == 0, "Вы уже зарегистрированы");
        drivers.push(Driver(FIO,0,0,0,experience_start,road_accidents,unpayed_fines,0,false,false,msg.sender));
        AddressToDriverId[msg.sender] = drivers.length-1;
        Rolecheck[msg.sender] = 2;
    }
    function licenseRegistration(uint licenseid) public {
        require(RoleCheck[msg.sender] != 0, "Вы не зарегистрированы");
        require(LicenseIdToDriverAddress[licenseid] == default_address, "Этот номер уже занят");
        drivers[AddressToDriver[msg.sender]].licenseid = licenseid;
        drivers[AddressToDriver[msg.sender]].expire_date = licenseid_expire[licenseid];
        drivers[AddressToDriver[msg.sender]].category = licenseid_category[licenseid];
        licenseid_busy[licenseid] = msg.sender;
        LicenseToAddress[licenseid] = msg.sender;
    }
    function vehicleRegistration(uint licenseid, uint vehicleCategory, uint vehicleCost, uint vehicleExploitation) public {
        require(drivers[AddressToDriverId[LicenseToAddress[licenseid]]].licenseid == licenseid);
        require(Rolecheck[msg.sender] != 0, "Вы не зарегистрированы");
        require(drivers[AddressToDriverId[LicenseToAddress[licenseid]]].category == vehicleCategory, "Вы не обладаете нужной категорией прав");
        vehicles.push(Vehicle(vehicleCategory, vehicleCost, vehicleExploitation, msg.sender));
        drivertovehicle[msg.sender] = vehicles.length-1;
    }
    function getInsurance() public view returns(int,string memory) {
        return(insurance_depositCount(msg.sender),"finney");
    }
    function insurance_depositCount(address driver) private view returns(int){
        if(int(10-int(vehicles[drivertovehicle[driver]].exploitation)) > 0){
            return(int(vehicles[drivertovehicle[driver]].cost*(10-vehicles[drivertovehicle[driver]].exploitation)*100 + drivers[AddressToDriverId[driver]].unpayed_fines*200 + drivers[AddressToDriverId[driver]].accidents - 200*((now -(drivers[AddressToDriverId[driver]].experience_start*365*86400 - 1970*365*86400))/86400/365)));
        }
        else {
            return(int(vehicles[drivertovehicle[driver]].cost*(vehicles[drivertovehicle[driver]].exploitation-10)*100 + drivers[AddressToDriverId[driver]].unpayed_fines*200 + drivers[AddressToDriverId[driver]].accidents - 200*((now -(drivers[AddressToDriverId[driver]].experience_start*365*86400 - 1970*365*86400))/86400/365)));
        }
    }
    function insuranceDeposit() public payable {
        require(drivers[AddressToDriverId[msg.sender]].insurance_deposit == 0, "У вас уже оформлена страховка");
        require(insurance_depositCount(msg.sender) >= 0, "Сумма страховки некорректна");
        drivers[AddressToDriverId[msg.sender]].insurancerequest = true;
    }
    function insuranceAccept() public payable {
        require(drivers[AddressToDriverId[msg.sender]].insurancerequest == true);
        if(int(10-int(vehicles[drivertovehicle[msg.sender]].exploitation)) > 0){
            require( msg.value == 1000000000000000 *(vehicles[drivertovehicle[msg.sender]].cost*(10-vehicles[drivertovehicle[msg.sender]].exploitation)*100 + drivers[AddressToDriverId[msg.sender]].unpayed_fines*200 + drivers[AddressToDriverId[msg.sender]].accidents - 200*((now -(drivers[AddressToDriverId[msg.sender]].experience_start*365*86400 - 1970*365*86400))/86400/365)), "Сумма не соответствует заявленной");
            drivers[AddressToDriverId[msg.sender]].insurance_deposit = msg.value;
        }
        else {
            require( msg.value == 1000000000000000*(vehicles[drivertovehicle[msg.sender]].cost*(vehicles[drivertovehicle[msg.sender]].exploitation-10)*100 + drivers[AddressToDriverId[msg.sender]].unpayed_fines*200 + drivers[AddressToDriverId[msg.sender]].accidents - 200*((now -(drivers[AddressToDriverId[msg.sender]].experience_start*365*86400 - 1970*365*86400))/86400/365)), "Сумма не соответствует заявленной");
            drivers[AddressToDriverId[msg.sender]].insurance_deposit = msg.value;
        }
    }
    function finePay(uint fine_id) public payable {
        if(fines[fine_id].time <= block.timestamp) {
            require(msg.value == 10, "Оплата стоит 10 эфиров");
            bank_address.transfer(10);
        }
        else {
            require(msg.value == 5, "Оплата стоит 5 эфиров");
            bank_address.transfer(5);
        }
    }
    function licenseexpirecount(address sender) private view returns(uint){
        uint x = drivers[AddressToDriverId[sender]].expire_date;
        return((x % 10000) * 365 * 86400 + (((x - x % 10000)/10000)%100)*30*86400 + (x- x % 1000000)/1000000*86400 - 1970 * 365 * 86400 - now);
    }
    function licenseRenewal(uint newlicenseid) public {
        require(drivers[AddressToDriverId[msg.sender]].category == licenseid_category[newlicenseid], "Эти права не соответствуют вашей категории");
        require(Rolecheck[msg.sender] != 0, "Вы не зарегистрированы");
        require(licenseid_busy[newlicenseid] == default_adr, "Это водительское удостоверение занято");
        require(licenseexpirecount(msg.sender) <= 30 * 86400, "До окончания действия осталось больше месяца");
        require(drivers[AddressToDriverId[msg.sender]].unpayed_fines == 0, "У вас есть неоплаченные штрафы");
        drivers[AddressToDriverId[msg.sender]].licenseid = newlicenseid;
        drivers[AddressToDriverId[msg.sender]].expire_date = licenseid_expire[newlicenseid];
        drivers[AddressToDriverId[msg.sender]].category = licenseid_category[newlicenseid];
        licenseid_busy[newlicenseid] = msg.sender;
    }
    function fineIsue(uint licenseid) public {
        require(Rolecheck[msg.sender] == 1, "Вы не являетесь сотрудником ДПС");
        fines.push(Fine(fines.length, block.timestamp+(5*5), false, drivers[AddressToDriverId[LicenseToAddress[licenseid]]].solidityadr));
        DriverFinesID[LicenseToAddress[licenseid]].push(fines.length);
    }
    function accidentRegistration(uint licenseid) public {
        require(Rolecheck[msg.sender] == 1, "Вы не являетесь сотрудником ДПС");
        DriverAccidentsID[LicenseToAddress[licenseid]].push(accidents.length);
        if(drivers[AddressToDriverId[LicenseToAddress[licenseid]]].insurance_deposit != 0) {
            accidents.push(Accident(accidents.length,drivers[AddressToDriverId[LicenseToAddress[licenseid]]].insurance_deposit*10,drivers[AddressToDriverId[LicenseToAddress[licenseid]]].solidityadr,true));
        }
        else {
            accidents.push(Accident(accidents.length,drivers[AddressToDriverId[LicenseToAddress[licenseid]]].insurance_deposit*10,drivers[AddressToDriverId[LicenseToAddress[licenseid]]].solidityadr,false));
        }
    }
    function insuranceView() public returns(uint){
        require(msg.sender == insurance_address, "Вы не являетесь страховой компанией");
        for(uint i = 0; i<accidents.length;i++) {
            if(accidents[i].finished == false) {
                insurancesum = insurancesum + accidents[i].insurance_cover;
            }
        }
        return(insurancesum);
    }
    function insurancePay() public payable returns(string memory){
        require(msg.sender == insurance_address, "Вы не являетесь страховой компанией");
        for(uint i = 0; i<accidents.length;i++) {
            if(accidents[i].finished == false) {
                insurancesum = insurancesum + accidents[i].insurance_cover;
            }
        }
        if(insurance_address.balance < insurancesum) {
            bankdebt = insurancesum - insurance_address.balance;
            return("Недостаточно денег на счету");
        }
        else {
            require(msg.value == insurancesum, "Вы указали недостаточное кол-во денег");
            for(uint i = 0; i<accidents.length;i++) {
                if(accidents[i].finished == false) {
                    accidents[i].driver.transfer(accidents[i].insurance_cover);
                }
            }
        }
    }
    function debtGet() public view returns(uint) {
        return(bankdebt);
    }
    function insuranceCredit() public payable {
        require(msg.sender == bank_address, "Вы не являетесь банком");
        require(msg.value == insurance_address.balance - insurancesum);
        insurance_address.transfer(insurance_address.balance - insurancesum);
    }
    function creditReturn() public payable {
        require(msg.sender == insurance_address, "Вы не являетесь страховой компанией");
        if(insurance_address.balance <= bankdebt) {
            require(msg.value == insurance_address.balance);
            bank_address.transfer(insurance_address.balance);
            bankdebt = bankdebt - insurance_address.balance;
        }
        else {
            require(msg.value == bankdebt);
            bank_address.transfer(bankdebt);
            bankdebt = 0;
        }
    }
}
