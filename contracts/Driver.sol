pragma solidity <=0.7.0;
contract Driver {
    struct Vehicle {//Пользователи
        uint category;
        uint cost;
        uint exploitation;
        address owner;
    }
    struct Driver {
        string FIO;
        uint licenseid;
        uint expire_date;
        uint category;
        uint exp_start;
        uint accidents;
        uint unpayed_fines;
        uint insurance_deposit;
        bool trafficpolice;
        bool needtobepayed;
        bool bankrequest;
        bool insurancerequest;
        address payable solidityadr;
    }
    struct Fine {
        uint id;
        address payable driver;
        uint time;
        bool finished;
    }
    struct Insurance {
        uint id;
        address payable driver;
        uint sum;
    }
    uint bankdebt = 0;
    Insurance[] insurances;
    Fine[] fines;
    Vehicle[] vehicles;
    Driver[] drivers;
    mapping (address => uint) DriverCategory;
    mapping (address => uint) DriverToVehicle;
    mapping (address => uint) RoleCheck;
    mapping (address => uint) AddressToDriver;
    mapping (address => uint []) DriverFinesID;
    mapping (address => uint []) DriverInsurancesID;
    mapping (uint => address payable) LicenseIdToDriverAddress;
    address payable bank_address = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB;
    address payable insurance_address = 0x617F2E2fD72FD9D5503197092aC168c91465E7f2;
    address payable default_address = 0x0000000000000000000000000000000000000000;
    constructor () public {
        drivers.push(Driver("Иванов Иван Иванович", 0, 0, 0, 2018, 0, 0, 0, true,false,false,false,0x82398aCb8D7136FEFaD951559769B7554F89A9a9));
        RoleCheck[0x82398aCb8D7136FEFaD951559769B7554F89A9a9] = 1;AddressToDriver[0x82398aCb8D7136FEFaD951559769B7554F89A9a9] = drivers.length - 1;
        drivers.push(Driver("Семенов Семен Семенович", 0, 0, 0, 2015, 0, 0, 0, false,false,false,false,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2));
        RoleCheck[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2] = 2;AddressToDriver[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2] = drivers.length - 1;
        drivers.push(Driver("Петров Петр Петрович", 0, 0, 0, 2010, 3, 0, 0, false,false,false,false,0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db));
        RoleCheck[0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db] = 2;AddressToDriver[0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db] = drivers.length - 1;
        fines.push(Fine(0,0x6147C886939B675725AF88356a5430b4F398C6CF,12222222,false));
        fines.push(Fine(1,0x6147C886939B675725AF88356a5430b4F398C6CF,1222222222,false));
        fines.push(Fine(2,0x6147C886939B675725AF88356a5430b4F398C6CF,122232222,false));
        LicenseIdToDriverAddress[0] = default_address;LicenseIdToDriverAddress[111] = default_address;LicenseIdToDriverAddress[222] = default_address;LicenseIdToDriverAddress[333] = default_address;LicenseIdToDriverAddress[444] = default_address;LicenseIdToDriverAddress[555] = default_address;LicenseIdToDriverAddress[666] = default_address;
    }
//    function driverInfo() public view returns(string memory, uint, uint, uint, uint, uint, uint, uint){
//        require(RoleCheck[msg.sender] != 0,"Вы не зарегистрированы");
//        return(drivers[AddressToDriver[msg.sender]].FIO, drivers[AddressToDriver[msg.sender]].licenseid, drivers[AddressToDriver[msg.sender]].expire_date, drivers[AddressToDriver[msg.sender]].category, drivers[AddressToDriver[msg.sender]].exp_start, drivers[AddressToDriver[msg.sender]].accidents, drivers[AddressToDriver[msg.sender]].unpayed_fines, drivers[AddressToDriver[msg.sender]].insurance_deposit);
//    }
    function driverInfoTest(address adr) public view returns(string memory, uint, uint, uint){
        require(RoleCheck[adr] != 0,"Вы не зарегистрированы");
        return(drivers[AddressToDriver[adr]].FIO,drivers[AddressToDriver[adr]].licenseid, drivers[AddressToDriver[adr]].expire_date, drivers[AddressToDriver[adr]].category);
    }
    function driverInfoTest1(address adr) public view returns( uint, uint, uint, uint,bool){
        require(RoleCheck[adr] != 0,"Вы не зарегистрированы");
        return(drivers[AddressToDriver[adr]].exp_start, drivers[AddressToDriver[adr]].accidents, drivers[AddressToDriver[adr]].unpayed_fines, drivers[AddressToDriver[adr]].insurance_deposit, drivers[AddressToDriver[adr]].trafficpolice);
    }
    function getFinesID() public view returns(uint[] memory ) {
        return(DriverFinesID[msg.sender]);
    }
    function getInsurances() public view returns(uint[] memory) {
        return(DriverInsurancesID[msg.sender]);
    }
    function getFine(uint fineID) public view returns(uint, bool) {
        return(fines[fineID].id, fines[fineID].finished);
    }
    function getInsurance(uint InsuranceID) public view returns(uint, uint) {
        return(insurances[InsuranceID].id,insurances[InsuranceID].sum);
    }
    function driverRegistration(string memory FIO, uint accidents, uint unpayed_fines, uint exp_start) public {
        require(RoleCheck[msg.sender] == 0, "Вы уже зарегистрированы");
        drivers.push(Driver(FIO, 0, 0, 0, exp_start, accidents, unpayed_fines, 0, false, false,false,false, msg.sender));
        RoleCheck[msg.sender] = 2;
        AddressToDriver[msg.sender] = drivers.length - 1;
    }
    function licenseRegistration(uint licenseid, uint expire_date, uint category) public {
//        require(RoleCheck[msg.sender] != 0,"Вы не зарегистрированы");
//        require(LicenseIdToDriverAddress[licenseid] == default_address, "Этот номер уже занят");
        drivers[AddressToDriver[msg.sender]].licenseid = licenseid;
        drivers[AddressToDriver[msg.sender]].expire_date = expire_date;
        drivers[AddressToDriver[msg.sender]].category = category;
        DriverCategory[msg.sender] = category;
        LicenseIdToDriverAddress[licenseid] = msg.sender;
    }
    function vehicleRegistration(uint category, uint cost, uint exploitation) public {
        require(DriverCategory[msg.sender] == category, "Вы не обладаете правами данной категории");
        vehicles.push(Vehicle(category, cost, exploitation, msg.sender));
        DriverToVehicle[msg.sender] = vehicles.length - 1;
    }
    function insuranceDeposit() public payable {
        require(vehicles[DriverToVehicle[msg.sender]].owner == msg.sender, "У вас нет машины");
        require(drivers[AddressToDriver[msg.sender]].insurance_deposit == 0, "У вас уже оформлена страховка");
        drivers[AddressToDriver[msg.sender]].insurancerequest = true;
    }
    function insuranceAccept() public payable {
        require(drivers[AddressToDriver[msg.sender]].insurancerequest == true);
        if(10 - vehicles[DriverToVehicle[msg.sender]].exploitation < 0){
            drivers[AddressToDriver[msg.sender]].insurance_deposit = vehicles[DriverToVehicle[msg.sender]].cost * ( (10 - vehicles[DriverToVehicle[msg.sender]].exploitation) - (10 - vehicles[DriverToVehicle[msg.sender]].exploitation)*2 )*1 + 20*drivers[AddressToDriver[msg.sender]].unpayed_fines + 100*drivers[AddressToDriver[msg.sender]].accidents- 20*((now - ((drivers[AddressToDriver[msg.sender]].exp_start-1970)*365*86400))/86400/365);// делим на 100
        }
        else {
            drivers[AddressToDriver[msg.sender]].insurance_deposit = vehicles[DriverToVehicle[msg.sender]].cost * (10 - vehicles[DriverToVehicle[msg.sender]].exploitation)*1 + 20*drivers[AddressToDriver[msg.sender]].unpayed_fines + 100*drivers[AddressToDriver[msg.sender]].accidents- 20*((now - ((drivers[AddressToDriver[msg.sender]].exp_start-1970)*365*86400))/86400/365);// делим на 100
        }
    }
    function fineIssue(uint licenseid) public {
//        require(RoleCheck[msg.sender] == 1, "Вы не являетесь полицейским ???");
//        require(LicenseIdToDriverAddress[licenseid] == drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].solidityadr, "??? ???????? ? ?????? ??????? ?????????????");
        drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].unpayed_fines++;
        DriverFinesID[LicenseIdToDriverAddress[licenseid]].push(fines.length);
        fines.push(Fine(fines.length, drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].solidityadr, block.timestamp, false));
    }
    function finePay(uint licenseid, uint fineID) public payable{
        require(fines[fineID].finished == false, "????? ??? ???????");
        require(msg.sender == drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].solidityadr, "?? ????? ????? ????? ????????????? ?????????????");
        if (block.timestamp - fines[fineID].time <= 5*5) {
            require(msg.value == 5,"Оплата штрафа стоит 10");
            bank_address.transfer(5);
            fines[fineID].finished = true;
        }
        else {
            require(msg.value == 10,"Оплата штрафа стоит 5");
            bank_address.transfer(10);
            fines[fineID].finished = true;
        }
        drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].unpayed_fines--;
    }
    function accidentReg(uint licenseid) public {
        require(RoleCheck[msg.sender] == 1, "Вы не являетесь сотрудником ДПС");
        require(LicenseIdToDriverAddress[licenseid] == drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].solidityadr, "Нет водителя с данным номером удостоверения");
        drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].accidents++;
        if (drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].insurance_deposit != 0) {
            drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].needtobepayed = true;
        }
    }
    function insurancePay(uint licenseid) public payable{
        require(msg.sender == insurance_address, "Вы не являетесь страховой компанией");
        require(drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].needtobepayed == true);
        require(msg.value == drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].insurance_deposit);
        if (msg.sender.balance < drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].insurance_deposit*10) {
            bankdebt = bankdebt + drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].insurance_deposit*10;
        }
        DriverInsurancesID[LicenseIdToDriverAddress[licenseid]].push(insurances.length);
        insurances.push(Insurance(insurances.length,LicenseIdToDriverAddress[licenseid], drivers[AddressToDriver[LicenseIdToDriverAddress[licenseid]]].insurance_deposit*10));
    }
    function viewdebt() public view returns(uint) {
        require(msg.sender == bank_address, "Вы не являетесь банком");
        return(bankdebt - insurance_address.balance);
    }
    function insurancecredit() public payable {
        require(msg.sender == bank_address || msg.sender == insurance_address, "Вы не являетесь банком или страховой компанией");
        require(msg.value == bankdebt - insurance_address.balance, "Нужно больше золота!");
        insurance_address.transfer(bankdebt - insurance_address.balance);
    }
    function creditReturn() public payable {
        require(msg.sender == insurance_address, "Вы не являетесь страховой компанией");
        if(insurance_address.balance <= bankdebt) {
            require(msg.value == insurance_address.balance, "Вы должны перевести все деньги в счёт долга банку");
        }
        else {
            require(msg.value == bankdebt,"Вы должны перевести всю сумму долга");
        }
    }
    function expire_date_secondsCount() public view returns (uint){
        uint x = drivers[AddressToDriver[msg.sender]].expire_date;
        return((((x % 10000) * 365 * 86400 + ((((x - (x % 10000)) / 10000) % 100) * 30 * 86400) + ((x - (x % 1000000))/1000000)*86400)-(1970 * 365 * 86400))- now);
    }
    function licenseRenewal(uint new_licenseid, uint new_expire_date, uint new_category) public {
        require(expire_date_secondsCount() <= 30*86400,"До конца срока окончания удостоверения больше месяца");
        require(drivers[AddressToDriver[msg.sender]].expire_date == 0, "У вас есть неоплаченные штрафы");
        require(LicenseIdToDriverAddress[new_licenseid] == default_address, "Этот номер уже занят");
        LicenseIdToDriverAddress[drivers[AddressToDriver[msg.sender]].licenseid] = default_address;
        drivers[AddressToDriver[msg.sender]].licenseid = new_licenseid;
        drivers[AddressToDriver[msg.sender]].expire_date = new_expire_date;
        drivers[AddressToDriver[msg.sender]].category = new_category;
    }

}






