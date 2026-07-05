package com.ecommerce.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.ecommerce.model.Address;
import com.ecommerce.ecommerce.repository.AddressRepository;

@RestController
@RequestMapping("/api/address")
@CrossOrigin("*")
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    // ADD ADDRESS
    @PostMapping("/add")
    public Address addAddress(@RequestBody Address address) {
        return addressRepository.save(address);
    }

    // GET USER ADDRESSES
    @GetMapping("/user/{userId}")
    public List<Address> getUserAddresses(@PathVariable Long userId) {
        return addressRepository.findByUserId(userId);
    }

    // UPDATE ADDRESS
    @PutMapping("/update/{id}")
    public Address updateAddress(
            @PathVariable Long id,
            @RequestBody Address updatedAddress
    ) {
        Optional<Address> optionalAddress =
                addressRepository.findById(id);

        if (optionalAddress.isEmpty()) {
            throw new RuntimeException("Address not found");
        }

        Address address = optionalAddress.get();

        address.setFullName(updatedAddress.getFullName());
        address.setPhone(updatedAddress.getPhone());
        address.setAddressLine(updatedAddress.getAddressLine());
        address.setCity(updatedAddress.getCity());
        address.setState(updatedAddress.getState());
        address.setPincode(updatedAddress.getPincode());

        return addressRepository.save(address);
    }

    // DELETE ADDRESS
    @DeleteMapping("/delete/{id}")
    public String deleteAddress(@PathVariable Long id) {

        Optional<Address> optionalAddress =
                addressRepository.findById(id);

        if (optionalAddress.isEmpty()) {
            throw new RuntimeException("Address not found");
        }

        addressRepository.deleteById(id);

        return "Address deleted successfully";
    }

    // SET DEFAULT ADDRESS
    @PutMapping("/default/{id}")
    public Address setDefaultAddress(@PathVariable Long id) {

        Optional<Address> optionalAddress =
                addressRepository.findById(id);

        if (optionalAddress.isEmpty()) {
            throw new RuntimeException("Address not found");
        }

        Address selected = optionalAddress.get();

        List<Address> userAddresses =
                addressRepository.findByUserId(selected.getUserId());

        for (Address address : userAddresses) {
            address.setIsDefault(false);
            addressRepository.save(address);
        }

        selected.setIsDefault(true);

        return addressRepository.save(selected);
    }
}