package com.ecommerce.ecommerce.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.ecommerce.model.Coupon;
import com.ecommerce.ecommerce.repository.CouponRepository;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin("*")
public class CouponController {

    @Autowired
    private CouponRepository couponRepository;

    @GetMapping("/validate/{code}")
    public Coupon validateCoupon(@PathVariable String code) {

        Optional<Coupon> coupon =
                couponRepository.findByCodeIgnoreCase(code);

        if (coupon.isEmpty()) {
            throw new RuntimeException("Invalid coupon");
        }

        if (!coupon.get().getActive()) {
            throw new RuntimeException("Coupon inactive");
        }

        return coupon.get();
    }
}